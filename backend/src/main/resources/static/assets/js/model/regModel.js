export default function RegModel() {
  this.getSido = async function () {
    const req = await fetch("/addr/sido");
    const data = await req.json();
    return data;
  };

  this.getGugun = async function (sido) {
    const req = await fetch(`/addr/gugun/${sido}`);
    const data = await req.json();
    return data;
  };

  this.getDong = async function (gugun) {
    const req = await fetch(`/addr/dong/${gugun}`);
    const data = await req.json();
    return data;
  };
}
