function setCurrentProjectId(id) {
  return {
    type: "SET_CURRENT_PROJECT_ID",
    payLoad: { id: id },
  };
}

export {setCurrentProjectId}
