// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    let count = message.data.count || 0;
    let i = 0,
      limit = 80000;
    while (i < limit) {
      console.log(i);
      i++;
    }

    if (i === limit) {
      postMessage({
        count,
        i,
        dataRecievedFromMain: JSON.stringify(message.data)
      });
    }
  };
};
