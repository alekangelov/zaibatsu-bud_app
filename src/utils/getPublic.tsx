export default function getPublic(imagePath = "") {
  if (imagePath.startsWith("/")) {
    return imagePath.replace("/", "");
  }
  return imagePath;
}
