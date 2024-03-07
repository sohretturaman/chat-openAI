/** @format */

export const getMessages = async (value) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: value,
    }),
  };

  try {
    if (value.trim().length === 0) {
      return;
    } else {
      console.log("!!!!sent request to api ");
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const jsonData = await response.json();
      const data = jsonData.choices[0].message;
      return data;
    }
  } catch (error) {
    console.log("an error occured on frontend", error);
    return;
  }
};
