const fakeApi = 'https://jsonplaceholder.typicode.com/posts';

fetch(fakeApi, {
    method: "POST",
    body: JSON.stringify({
      title: "Hadis fake post !!",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ut placeat nobis sequi pariatur officiis quaerat officia!!",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  