export default function createLogo(grpName) {
  let splitName = grpName.split(" ");
  let logo = splitName[0].charAt(0) + (splitName[1]?.charAt(0) || "");

  return logo.toUpperCase();
}
