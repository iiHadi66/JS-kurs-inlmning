const fakeUrl ="https://jsonplaceholder.typicode.com/posts";
fetch(fakeUrl, {
    method: "POST",
    body: JSON.stringify({
      title: "Testing av fake post",
      body: "Abdul Rahman",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));