/**
* Keep the "Age" field in the About section in sync with the birthday
*/
(function () {
  "use strict";

  let ageEl = document.getElementById('age');
  if (!ageEl) return;

  let birthDate = new Date(1997, 7, 15); // 15 Aug 1997
  let today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  let hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
  if (!hasHadBirthdayThisYear) {
    age--;
  }

  ageEl.textContent = age;

})();
