import React, { useEffect, useState } from "react";

function Sighting({ match, loggedIn, user }) {
  const [sighting, setSighting] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://squatch-spotter-server.onrender.com/sightings/${match.params.id}`
    )
      .then((response) => response.json())
      .then((data) => setSighting(data));
  }, [match.params.id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setError("You need to be logged in to post a comment.");
      return;
    }
    if (!commentText) {
      setError("Comment text is required.");
      return;
    }

    const comment = {
      user_id: user.id,
      sighting_id: sighting.id,
      comment_text: commentText,
    };

    fetch("https://squatch-spotter-server.onrender.com/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentText("");
        setError("");
        setSighting((prevSighting) => ({
          ...prevSighting,
          comments: [...prevSighting.comments, data],
        }));
      })
      .catch((error) => {
        console.error("Error posting comment: ", error);
      });
  };

  if (!sighting) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
      <div className="text-center">
        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
          {sighting.location.name}, {sighting.location.state}
        </h2>
        <p className="mt-1 text-4xl text-green-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Sighted on {new Date(sighting.sighting_date).toDateString()}
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <p className="px-5 text-green-1000">{sighting.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-5">Comments:</h2>
        {sighting.comments && sighting.comments.length === 0 ? (
          <p className="text-green-900">No comments yet.</p>
        ) : (
          sighting.comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-green-200 my-2 rounded shadow-md"
            >
              <p className="text-green-900">{comment.comment_text}</p>
              <p className="font-bold text-green-900 text-sm">
                - {comment.user.email}
              </p>
            </div>
          ))
        )}

        {loggedIn ? (
          <form className="mt-8" onSubmit={handleCommentSubmit}>
            <label htmlFor="comment" className="text-lg font-bold mb-2">
              Add a comment:
            </label>
            <textarea
              id="comment"
              name="comment"
              className="w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded"
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mt-8">
            Please{" "}
            <a href="/login" className="text-green-600 font-bold underline">
              log in
            </a>{" "}
            or{" "}
            <a href="/signup" className="text-green-600 font-bold underline">
              sign up
            </a>{" "}
            to post a comment.
          </p>
        )}
      </div>
    </div>
  );
}

export default Sighting;
