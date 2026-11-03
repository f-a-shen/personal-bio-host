(function () {
  "use strict";

  var root = document.documentElement;

  if (
    !root.classList ||
    !document.querySelectorAll ||
    !document.addEventListener ||
    !("hidden" in document.createElement("li"))
  ) {
    return;
  }

  // Apply the default before the post list is parsed to prevent a visible flash.
  root.classList.add("post-filter-enabled");
  root.classList.add("post-filter-long-only");

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-post-filter-toggle]");
    var posts = document.querySelectorAll(".post-item[data-post-type]");
    var validTypes = ["article", "note", "response", "repost"];

    if (!toggle || posts.length === 0) {
      root.classList.remove("post-filter-enabled");
      root.classList.remove("post-filter-long-only");
      return;
    }

    Array.prototype.forEach.call(posts, function (post) {
      var postType = post.getAttribute("data-post-type");

      if (
        validTypes.indexOf(postType) === -1 &&
        typeof console !== "undefined" &&
        console.warn
      ) {
        console.warn("Unexpected post_type value: " + postType, post);
      }
    });

    function setLongPostsOnly(selected) {
      toggle.setAttribute("aria-pressed", String(selected));
      root.classList.toggle("post-filter-long-only", selected);

      Array.prototype.forEach.call(posts, function (post) {
        post.hidden = selected && post.getAttribute("data-post-type") !== "article";
      });
    }

    toggle.addEventListener("click", function () {
      setLongPostsOnly(toggle.getAttribute("aria-pressed") !== "true");
    });

    setLongPostsOnly(true);
    toggle.hidden = false;
  });
})();
