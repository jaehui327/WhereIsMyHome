export default function UserModel() {
  this.register = async function (user) {
    const req = await fetch(`/user/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return req.status;
  };

  this.login = async function (user) {
    const req = await fetch(`/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return req.status;
  };
}
