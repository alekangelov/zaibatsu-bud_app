const tags: Tags = [
  "Counter Hit",
  "Rage",
  "Rage Art",
  "Rage Drive",
  "Advanced",
  "Beginner",
  "Intermediate",
  "Wall",
].map((e) => ({
  label: e,
  value: e.split(" ").join("-").toLowerCase(),
}));

export type Tag = { label: string; value: string };
export type Tags = Tag[];

export default tags;
