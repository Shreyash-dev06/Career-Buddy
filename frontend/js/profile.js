// // profile.js
// document.addEventListener("DOMContentLoaded", () => {
//   const user = getUser();

//   // --- Redirect if no user ---
//   if (!user) {
//     window.location.href = "index.html";
//     return;
//   }

//   // --- Helper to safely fill profile info ---
//   const setText = (id, value) => {
//     const el = document.getElementById(id);
//     if (el) el.innerText = value;
//   };

//   setText("profile-name", user?.name || "Guest User");
//   setText("profile-email", user?.email || "guest@example.com");
//   setText("profile-gender", user?.gender || "Not specified");
//   setText("profile-age", user?.age || "Not specified");
//   setText("profile-class", user?.class || "Not specified");
//   setText("profile-stream", user?.stream || "Not decided");
//   setText("profile-interests", user?.interests || "Not provided");
//   setText("profile-careerGoal", user?.careerGoal || "Not specified");
//   setText("profile-skills", user?.skills || "Not provided");
//   setText("profile-location", user?.location || "Not specified");

//   // --- Edit Profile Button ---
//   const editBtn = document.getElementById("edit-profile-btn");
//   if (editBtn) {
//     editBtn.addEventListener("click", () => {
//       const modal = document.getElementById("auth-modal");
//       if (!modal) return;
//       modal.classList.remove("hidden");

//       const setInput = (id, value) => {
//         const input = document.getElementById(id);
//         if (input) input.value = value;
//       };

//       setInput("input-name", user?.name || "");
//       setInput("input-email", user?.email || "");
//       setInput("input-gender", user?.gender || "");
//       setInput("input-age", user?.age || "");
//       setInput("input-class", user?.class || "");
//       setInput("input-stream", user?.stream || "");
//       setInput("input-interests", user?.interests || "");
//       setInput("input-career-goal", user?.careerGoal || "");
//       setInput("input-skills", user?.skills || "");
//       setInput("input-location", user?.location || "");
//     });
//   }

//   // --- Quiz Result Handling ---
//   const quizData = JSON.parse(localStorage.getItem("cb_quiz_last"));
//   const resultBox = document.getElementById("quiz-result-box");

//   if (resultBox) {
//     if (!quizData || !quizData.answers || quizData.answers.length === 0) {
//       resultBox.innerHTML = `
//         <p>❌ You haven’t taken the quiz yet!</p>
//         <a href="quiz.html" class="btn-primary">Take the Quiz Now →</a>
//       `;
//     } else {
//       const score = quizData.result;
//       resultBox.innerHTML = `
//         <p><strong>Top Interest Detected Field:</strong> ${score}</p>
//         <p>We recommend exploring careers in the <strong>${score}</strong> stream!</p>
//         <br>
//         <button id="detectedCourse" class="btn-primary">Explore ${score} →</button>
//       `;

//       // Attach click handler to dynamic button
//       const detectedBtn = document.getElementById("detectedCourse");
//       if (detectedBtn) {
//         detectedBtn.addEventListener("click", () => {
//           if (typeof window.showCareersByStream === "function") {
//             window.showCareersByStream(score.toLowerCase());
//             window.location.href = "careers.html?stream=" + encodeURIComponent(score);
//           } else {
//             console.error("Career function not available!");
//           }
//         });

//       }

//       // Render chart if scores exist
//       if (quizData.careerScores) {
//         renderCareerChart(quizData.careerScores);
//       }
//     }
//   }
// });

// // --- Chart.js Pie Chart ---
// function renderCareerChart(careerScores) {
//   const ctx = document.getElementById("careerChart");
//   if (!ctx) return;

//   if (window.careerChartInstance) {
//     window.careerChartInstance.destroy();
//   }

//   window.careerChartInstance = new Chart(ctx, {
//     type: "pie",
//     data: {
//       labels: Object.keys(careerScores),
//       datasets: [{
//         data: Object.values(careerScores),
//         backgroundColor: ["#7993d3ff",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#FF9F40",
//           "#baf568ff",
//           "#f47eb1ff",
//           "#ff6961ff"
//         ],
//       }],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: "bottom" },
//         title: { display: true, text: "Career Score Distribution" },
//       },
//     },
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  const user = getUser();

  if (!user) {
    alert("Sign In to access Your profile");
    window.location.href = "index.html";
    return;
  }

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerText = value;
  };

  function refreshProfile() {
    const u = getUser();
    if (!u) return;
    setText("profile-name", u.name || "Guest User");
    setText("profile-email", u.email || "guest@example.com");
    setText("profile-gender", u.gender || "Not specified");
    setText("profile-age", u.age || "Not specified");
    setText("profile-class", u.class || "Not specified");
    setText("profile-stream", u.stream || "Not decided");
    setText("profile-interests", u.interests || "Not provided");
    setText("profile-careerGoal", u.careerGoal || "Not specified");
    setText("profile-skills", u.skills || "Not provided");
    setText("profile-location", u.location || "Not specified");
  }

  refreshProfile();

  document.addEventListener("profileUpdated", refreshProfile);

  const editBtn = document.getElementById("edit-profile-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      const modal = document.getElementById("auth-modal");
      if (!modal) return;
      modal.classList.remove("hidden");

      const currentUser = getUser();

      const setInput = (id, value) => {
        const input = document.getElementById(id);
        if (input) input.value = value;
      };

      setInput("input-name", currentUser?.name || "");
      setInput("input-email", currentUser?.email || "");
      setInput("input-gender", currentUser?.gender || "");
      setInput("input-age", currentUser?.age || "");
      setInput("input-class", currentUser?.class || "");
      setInput("input-stream", currentUser?.stream || "");
      setInput("input-interests", currentUser?.interests || "");
      setInput("input-career-goal", currentUser?.careerGoal || "");
      setInput("input-skills", currentUser?.skills || "");
      setInput("input-location", currentUser?.location || "");
    });
  }


  const quizData = JSON.parse(localStorage.getItem("cb_quiz_last"));
  const resultBox = document.getElementById("quiz-result-box");

  if (resultBox) {
    if (!quizData || !quizData.answers?.length) {
      resultBox.innerHTML = `
        <p>❌ You haven’t taken the quiz yet!</p>
        <a href="quiz.html" class="btn-primary">Take the Quiz Now →</a>
      `;
    } else {
      const score = quizData.result;

      resultBox.innerHTML = `
        <p><strong>Top Interest Detected Field:</strong> ${score}</p>
        <p>We recommend exploring careers in the <strong>${score}</strong> stream!</p>
        <br>
      <a href="careers.html" class="btn-primary">Explore Courses →</a>
       `;

       function renderCareerChart(careerScores) {
  const ctx = document.getElementById("careerChart");
  if (!ctx) return;

  if (window.careerChartInstance) window.careerChartInstance.destroy();

  window.careerChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(careerScores),
      datasets: [{
        data: Object.values(careerScores),
        backgroundColor: [
          "#7993d3ff", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#baf568ff", "#f47eb1ff", "#ff6961ff"
        ],
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Career Score Distribution" },
      },
    },
  });
}

/* <button id="detectedCourse" class="btn-primary">Explore ${score} →</button> */
//       document.getElementById("career").addEventListener("click", () => {
        
        
// });



      // Render chart
      if (quizData.careerScores) {
        renderCareerChart(quizData.careerScores);
      }
    }
  }
});

// Chart.js function (same as before)
// function renderCareerChart(careerScores) {
//   const ctx = document.getElementById("careerChart");
//   if (!ctx) return;

//   if (window.careerChartInstance) window.careerChartInstance.destroy();

//   window.careerChartInstance = new Chart(ctx, {
//     type: "pie",
//     data: {
//       labels: Object.keys(careerScores),
//       datasets: [{
//         data: Object.values(careerScores),
//         backgroundColor: [
//           "#7993d3ff", "#36A2EB", "#FFCE56", "#4BC0C0",
//           "#9966FF", "#FF9F40", "#baf568ff", "#f47eb1ff", "#ff6961ff"
//         ],
//       }],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: "bottom" },
//         title: { display: true, text: "Career Score Distribution" },
//       },
//     },
//   });
// }
