import express from "express";

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const responseObject = {
  slackUsername: "denniman02",
};

app.post("/", (req, res) => {
  const { operation_type, y, x } = req.body;

  if (!operation_type) {
    res.status(400).send("missing operation_type");
    return;
  }

  if (!y || !x) {
    res.status(400).send("missing x and y integer");
    return;
  }

  if (typeof y !== "number" || typeof x !== "number") {
    res.status(400).send("x and y must be an integer value");
    return;
  }

  let result;

  switch (operation_type) {
    case "addition":
      result = y + x;
      res.send({
        ...responseObject,
        result,
        operation_type,
      });
      break;
    case "subtraction":
      x > y ? (result = x - y) : (result = y - x);
      res.send({
        ...responseObject,
        result,
        operation_type,
      });
      break;
    case "multiplication":
      result = y * x;
      res.send({
        ...responseObject,
        result,
        operation_type,
      });
      break;
    default:
      res.status(400).send(`invalid operation_type ${operation_type}`);
  }
});

app.listen(port, () => console.log(`app running on port ${port}`));
