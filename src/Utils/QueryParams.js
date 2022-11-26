const url = new URL(window.location);

const urlParams = {
  getId: () => {
    return +url.searchParams.get('id');
  },
  setId: (id) => {
    url.searchParams.set('id', id);
    // Is causing performance issues. Deferring
    setTimeout(() => {
      window.history.pushState({}, '', url);
    }, 100);
  },
};

export default urlParams;
