const backBtn = document.getElementById("backToSurprise");
const wishForm = document.getElementById("wishForm");

wishForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Send form using fetch (so she gets confirmation)
  fetch(wishForm.action, {
    method: "POST",
    body: new FormData(wishForm),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      alert("🌸 Your wish has been sent!");
      wishForm.reset();
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  }).catch(() => {
    alert("Error: Unable to send wish. Please try again.");
  });
});
