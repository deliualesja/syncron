document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const arrivalDate = document.getElementById("arrival_date").value;
      const departureDate = document.getElementById("departure_date").value;
      const adults = document.getElementById("adults").value;
      const room = document.getElementById("availability_room").value;

      if (!arrivalDate || !departureDate || !adults) {
        alert("Please fill in all required fields.");
        return;
      }

      if (new Date(arrivalDate) >= new Date(departureDate)) {
        alert("Departure date must be after arrival date.");
        return;
      }

      let message = "Availability Checked!\n";
      if (room) message += `Room: ${room}\n`;
      message += "Please contact us at +355682081598 to finalize your booking.";
      
      alert(message);
    });
  }

  const counters = document.querySelectorAll(".count");
  const speed = 200; 

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.disconnect(); 
      }
    });
  }, observerOptions);

  const counterSection = document.querySelector(".counter");
  if (counterSection) {
    observer.observe(counterSection);
  }

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    }

    scrollToTopBtn.addEventListener('click', function () {
      document.body.scrollTop = 0; 
      document.documentElement.scrollTop = 0;
    });
  }

  const modal = document.getElementById("bookingModal");
  const span = document.getElementsByClassName("close")[0];
  const roomSelect = document.getElementById("modal_room");

  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
      if (btn.textContent.trim().toUpperCase() === 'BOOK NOW') {
          btn.addEventListener('click', (e) => {              
               const textDiv = btn.closest('.text');
               let apartmentName = "Select a Room..."; 
               
               if (textDiv) {
                   const title = textDiv.querySelector('h2');
                   if (title) apartmentName = title.textContent.trim();
               }

               if (modal) {
                   modal.style.display = "block";
                   document.body.style.overflow = "hidden"; 
                   if (roomSelect) {                      
                       let options = Array.from(roomSelect.options);
                       let optionToSelect = options.find(item => item.value === apartmentName);
                       if (optionToSelect) {
                           roomSelect.value = apartmentName;
                       } else {
                           roomSelect.value = "General Inquiry";
                       }
                   }
               }
          });
      }
  });

  if (span) {
      span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; 
      }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; 
    }
  }

  const whatsappForm = document.getElementById("whatsappForm");
  if (whatsappForm) {
      whatsappForm.addEventListener("submit", function(e) {
          e.preventDefault();
          
          const name = document.getElementById("modal_name").value;
          const phone = document.getElementById("modal_phone").value;
          const email = document.getElementById("modal_email").value;
          const message = document.getElementById("modal_message").value;
          const room = document.getElementById("modal_room").value;

          const phoneNumber = "355682081598";
          
          let text = `Hello, I would like to book "${room}".\n`;
          text += `Name: ${name}\n`;
          text += `Phone: ${phone}\n`;
          if (email) text += `Email: ${email}\n`;
          if (message) text += `Message: ${message}`;

          const encodedText = encodeURIComponent(text);
          const url = `https://wa.me/${phoneNumber}?text=${encodedText}`;

          window.open(url, '_blank').focus();
          
          modal.style.display = "none";
      });
  }
});
