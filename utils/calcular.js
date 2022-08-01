process.on('message', msg => {
    const nums = {};
    let rnum = 0;
    for(let i = 0; i < msg.cant; i++){
        rnum = Math.floor(Math.random() * (1000 - 1) + 1);
        if(rnum in nums){
            nums[rnum]++;
        }else{
            nums[rnum] = 1;
        }
    }

    process.send(nums);
})