function receiveEntities(entities) {
  return {
    type: "RECEIVE_ENTITIES",
    payLoad: entities,
  };
}

export default receiveEntities;
