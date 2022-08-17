const calcular = (cant = 1000) => {
  const nums = {};
  let rnum = 0;
  for (let i = 0; i < cant; i++) {
    rnum = Math.floor(Math.random() * (1000 - 1) + 1);
    if (rnum in nums) {
      nums[rnum]++;
    } else {
      nums[rnum] = 1;
    }
  }

  return nums;
};

module.exports = calcular;
