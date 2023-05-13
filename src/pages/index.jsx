export default function Hello() {
  const onCopy = async () => {
    try {
      const res = await navigator.clipboard.writeText(liran);
      console.log("ressss", res);
    } catch (e) {
      console.log("eeee", e);
    }
  };
  return (
    <div>
      hello
    </div>
  );
}
