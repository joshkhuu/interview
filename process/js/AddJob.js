var React = require('react');

var AddJob = React.createClass({

  toggleJobDisplay: function() {
    this.props.handleToggle();
  },

  handleAdd: function(e) {
    var tempItem = {
      jobName: this.refs.inputJobName.value,
      companyName: this.refs.inputCompanyName.value,
      jobDate: this.refs.inputJobDate.value + ' ' +
        this.refs.inputJobTime.value,
      jobNotes: this.refs.inputJobNotes.value
    } //tempItem
    e.preventDefault();
    this.props.addJob(tempItem);
  }, //handleAdd

  render: function() {

    var displayJobBody = {
      display: this.props.bodyVisible ? 'block' : 'none'
    };

    return(
      <div className="panel panel-primary">
        <div className="panel-heading job-addheading" onClick={ this.toggleJobDisplay }>
        <span className="glyphicon glyphicon-plus"></span> Add Job</div>
        <div className="panel-body" style={ displayJobBody }>
          <form className="add-appointment form-horizontal"
          onSubmit={ this.handleAdd }>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="jobName">Job Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="jobName" ref="inputJobName" placeholder="Job's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="companyName">Company</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="companyName" ref="inputCompanyName" placeholder="Company's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="jobDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="jobDate" ref="inputJobDate" />
              </div>
              <label className="col-sm-2 control-label" for="jobTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="jobTime" ref="inputJobTime" />
              </div>

            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="jobNotes">Job Notes</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="jobNotes" ref="inputJobNotes" placeholder="Job Notes"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Add Job</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )//return
  } //render
}); // AddJob

module.exports = AddJob;
