// fetch("http://localhost:8080/myData", {
//   method: "GET",
// })
//   .then((response) => response.json())
//   .then((data) => renderData(data));

// const show = document.getElementById("show");
// function renderData(data) {
//   data.forEach((el) => {
//     const div = document.createElement("div");
//     const image = document.createElement("img");
//     image.src = el.image;
//     image.style.width = "100px";
//     image.style.height = "100px";
//     div.appendChild(image);
//     show.append(div);
//   });
// }

const takenemail = document.getElementById("email");
const takenpassword = document.getElementById("password");
const show = document.getElementById("show");

function submitData() {
  e.preventDefault();
  if (takenemail.value !== "" && takenpassword.value !== "") {
    const obj = {
      id: Date.now(),
      email: takenemail.value,
      password: takenpassword.value,
    };
    fetch("http://localhost:8080/myData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  } else {
    alert("Fill in all the fields");
  }
  window.location.href = "./login.html";
}

async function getData() {
  await fetch("http://localhost:8080/myData", {
    method: "GET",
  })
    .then((res) => console.log(res.json()))
    .then((data) => {
      putdel(data);
    });
}

getData();

function putdel(data) {
  data.map((el) => {
    const div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.innerText = el.email;
    const h2 = document.createElement("h1");
    h2.innerText = el.password;
    const putb = document.createElement("button");
    putb.innerText = "Update";

    putb.addEventListener("click", () => {
      let updatedvalue = prompt("");
      const data = {
        email: updatedvalue,
        password: el.password,
      };
      fetch(`http://localhost:8080/myData/${el.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          alert("Updated");
        } else {
          alert("Error");
        }
      });
    });

    const delb = document.createElement("button");
    delb.innerText = "Delete";
    delb.addEventListener("click", () => {
      fetch(`http://localhost:8080/myData/${el.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          alert("Deleted");
        } else {
          alert("Error");
        }
      });
    });
    div.append(h1, h2, putb, delb);
    show.append(div);
  });
}

// form.addEventListener("submit", () => {});

// button.addEventListener("submit", () => {
//   //   console.log({
//   //     email: takenemail,
//   //     password: takenpassword,
//   //   });
// });
