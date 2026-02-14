const express = require("express");
const {users} = require("../data/users.json");

const router = express.Router();

/**
 * Route:/users
 * Method:GET
 * Descsription:Get all the list of users in the system
 * Access:Public
 * Parameters:None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route:/users/:id
 * Method:GET
 * Descsription:Get a user by their ID
 * Access:Public
 * Parameters:id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(400).json({
      sucess: false,
      message: `User not found ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * Route:/users
 * Method:POST
 * Descsription:CREATE A NEW USER
 * Access:Public
 * Parameters:NONE
 */

router.post("/", (req, res) => {
  //req.body should have the following fields
  const {
    id,
    name,
    email,
    phone,
    membershipType,
    membershipStartDate,
    membershipExpiryDate,
  } = req.body;

  //check if all the required fields are present
  if (
    !id ||
    !name ||
    !email ||
    !phone ||
    !membershipType ||
    !membershipStartDate ||
    !membershipExpiryDate
  ) {
    return res.status(400).json({
      sucess: false,
      message: "Please provide all the required fields",
    });
  }

  // check if user already exists
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(409).json({
      success: false,
      message: `User Already Exists with id:${id}`,
    });
  }

  //If all checks pass,create the user
  //and push it to the users array
  users.push({
    id,
    name,
    phone,
    membershipType,
    membershipStartDate,
    membershipExpiryDate,
  });

  res.status(201).json({
    success: true,
    message: "user created successfully",
  });
});

/**
 * Route:/users/:id
 * Method:PUT
 * Descsription:Update a new user by their ID
 * Access:Public
 * Parameters:ID
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  //check if the user exists
  const user = users.find((each) => each.id === id);
  if (!users) {
    return res.status(404).json({
      success: false,
      message: `user not found for id:${id}`,
    });
  }

  //object.assign(user,data);
  //with spread operator
  const updatedUser = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });

  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "user updated successfully",
  });
});

/**
 * Route:/users/:id
 * Method:DELETE
 * Descsription:DELETE a  user by their ID
 * Access:Public
 * Parameters:ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = users.findIndex((each) => each.id == id);

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `User Not Found for id: ${id}`,
    });
  }

  users.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    data: users,
    message: "User Deleted Successfully",
  });
});


module.exports=router;










// app.all('*',(req,res)=>{
//     res.status(500).json({
//         message:"Not Built Yet"
//     })
// })

// app.listen(PORT, () => {
//   console.log(`server is up and runing on http://localhost:${PORT}`);
// });
