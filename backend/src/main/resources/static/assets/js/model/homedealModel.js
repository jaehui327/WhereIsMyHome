export default function HomeDealModel() {
  this.getHomeDeal = async function (regcode, year, month) {
    const req = await fetch(`/homedeal/${year}/${month}/${regcode}`);
    if (req.status === 200) {
      const data = await req.json();
      return data;
    } else if (req.status === 204) {
      return "nodata";
    }
  };
}
