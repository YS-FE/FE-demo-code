/**
 * 一些项目要占用一个会议室宣讲，会议室不能同时容纳两个项目 的宣讲。
 * 给你每一个项目开始的时间和结束的时间(给你一个数 组，里面 是一个个具体的项目)，你来安排宣讲的日程，
 * 要求会 议室进行 的宣讲的场次最多。
 * 返回这个最多的宣讲场次
 */

interface Meeting {
  name : string,
  start : number,
  end : number
}

/**
 * 
 * @param arr {会议数组}
 * @param currTime {当前时间}
 */
function arrangeMeeting(arr : Meeting[], currTime : number) : number {
  if(!arr && arr.length == 0) 
    return 0;
  
  let result = 0;
  //按照结束时间 从小到大排列
  arr.sort((a, b) => {
    return a.end - b.end;
  });

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].start > currTime) {
      result++;
      currTime = arr[i].end;
    }
  }

  return result;
}

function main() {
  let meetings = [
    {
      name: '项目01',
      start: (new Date('2018-12-01 09:30:00')).getTime(),
      end: (new Date('2018-12-01 11:30:00')).getTime()
    }, {
      name: '项目02',
      start: (new Date('2018-12-01 10:30:00')).getTime(),
      end: (new Date('2018-12-01 11:20:00')).getTime()
    }, {
      name: '项目03',
      start: (new Date('2018-12-01 11:32:00')).getTime(),
      end: (new Date('2018-12-01 11:55:00')).getTime()
    }, {
      name: '项目04',
      start: (new Date('2018-12-01 11:28:00')).getTime(),
      end: (new Date('2018-12-01 13:30:00')).getTime()
    }, {
      name: '项目05',
      start: (new Date('2018-12-01 13:40:00')).getTime(),
      end: (new Date('2018-12-01 13:50:00')).getTime()
    }
  ]
  console.log(arrangeMeeting(meetings, Date.now()));
}

main();