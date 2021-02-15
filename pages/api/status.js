export default async function handler(req, res) {
  const { method } = req;

  await fetch(`https://dev.fractal-it.fr:8443/fake_health_test?dynamic=true`, {
    method: "GET",
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      if (
        Number(result.description.substring(21, 24)) < 31 &&
        Number(result.description.substring(21, 24)) > 25 &&
        result.status === "error"
      ) {
        console.log("Status à error depuis au moins 30 sec");
      }
      if(
        Number(result.description.substring(21, 24)) < 61 &&
        Number(result.description.substring(21, 24)) > 55 &&
        result.status === "ok"
      ) {
        console.log("Status à ok de nouveau");
      }

      return res.status(200).json({
        result,
      });
    });
}
