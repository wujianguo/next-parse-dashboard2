Parse.Cloud.define("countLabel", async (request) => {
  const query = new Parse.Query("Task");
  query.equalTo("label", request.params.label);
  const results = await query.find();
  return results.length;
});

Parse.Cloud.job("changeTitle", (request) =>  {
  // params: passed in the job call
  // headers: from the request that triggered the job
  // log: the ParseServer logger passed in the request
  // message: a function to update the status message of the job object
  const { params, headers, log, message } = request;
  message("I just started");
  const Task = Parse.Object.extend("Task");
  const query = new Parse.Query(Task);
  query.get(params.input.id).then((object) => {
    object.set('title', new Date().toString());
    object.save().then((response) => {
      message(`success`);
    }, (error) => {
      message(`error ${error}`);
    });
  }, (error) => {
    message(`error ${error}`);
  });
});
