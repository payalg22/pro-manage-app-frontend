export default function createLogo(name) {
  let splitName = name.split(" ");
  let logo = splitName[0].charAt(0) + (splitName[1]?.charAt(0) || "");

  return logo.toUpperCase();
}
