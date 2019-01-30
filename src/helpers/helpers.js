const partyById = (arr, partyId) => arr.filter((party) => {
  const { id } = party;
  return id.toString() === partyId.toString();
});

export default partyById;
