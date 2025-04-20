$(document).ready(function () {
  // Initialize budget display
  const budgetDisplay = $("<div>", {
    id: "budget-display",
    class: "ui-body ui-body-a",
    css: {
      "text-align": "center",
      margin: "10px 0",
    },
  });

  $("#budget-slider").after(budgetDisplay);

  // Budget slider handler
  $("#budget-slider")
    .on("input change", function () {
      const value = $(this).val();
      $("#budget-display").text(`Selected Budget: $${value}`);
    })
    .trigger("change");

  // Form validation and submission
  $("#contact form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    if (!name || !email || !message) {
      $.mobile.toast({
        message: "Please fill in all fields",
        duration: 2000,
      });
      return;
    }

    // Show loading
    $.mobile.loading("show", {
      text: "Sending message...",
      textVisible: true,
    });

    // Simulate API call
    setTimeout(() => {
      $.mobile.loading("hide");

      // Show success message
      const successMsg = $("<div>", {
        class: "ui-body ui-body-b",
        text: "Thank you! Your message has been sent.",
        css: {
          margin: "10px 0",
          "text-align": "center",
        },
      });

      $("#contact form").before(successMsg);
      this.reset();

      setTimeout(() => successMsg.fadeOut(), 3000);
    }, 1500);
  });

  // Gallery image preview
  $(".gallery-item").on("click", function (e) {
    e.preventDefault();

    const imgSrc = $(this).attr("href");
    const preview = $("<div>", {
      class: "image-preview",
      css: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
        "z-index": 9999,
      },
    }).append(
      $("<img>", {
        src: imgSrc,
        css: {
          "max-width": "90%",
          "max-height": "90%",
          "object-fit": "contain",
        },
      })
    );

    $("body").append(preview);
    preview.on("click", function () {
      $(this).remove();
    });
  });
});
