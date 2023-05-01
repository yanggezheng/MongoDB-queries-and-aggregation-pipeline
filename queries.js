// jobs queries


// 1.
db.jobs.distinct('Career Level')


// 2.
db.jobs.aggregate([
    {$match:{'Posting Type':'External', 'Salary Frequency':'Hourly'}},
    {$project: {_id : 0, 'Agency':1, 'Business Title':1,'Salary Range To':1}}
    ,{$sort:{'Salary Range To':-1}}
    ,{$limit:3}
])



// 3.
db.jobs.aggregate([{$match:{'Full-Time/Part-Time indicator':'F', 'Posting Type':'External'}},{$group:{_id:'$Agency', count:{$count:{}}}}])


// 4.
db.jobs.aggregate([{$match:{'Full-Time/Part-Time indicator':'F', 'Posting Type':'External'}},{$group:{_id:'$Agency', count:{$count:{}}}},{$match: {count: {$gt: 100}}}])


// 5.
db.jobs.aggregate([{$match: { 'Full-Time/Part-Time indicator': 'F', 'Posting Type': 'External' }},
    {$group: {_id: {agency: '$Agency'}, count: {$sum: 1}}},
    {$match: {count: {$gt: 100}}},
    {$project: {count: 1,agency: {$toLower: '$_id.agency'},  _id: 0}},
    {$sort: {count: -1}}
  ])


// 6.

var arr = {$split: ['$Posting Date', '/']}
var first = {$arrayElemAt:[arr, 2]}
db.jobs.aggregate([
  {$project: {
    year: first,
    salary: '$Salary Range To'
  }},
  {$group: {
    _id: '$year',
    'Average Salary': {$avg: '$salary'}
  }},
  {$sort: {_id: 1}}
])
