var React = require('react');

var JobList = React.createClass({

  handleDelete: function() {
    this.props.onDelete(this.props.whichItem)
  },

  render: function() {
    return(
      <li className="job-item media">
        <div className="media-left">
          <button className="job-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
          <span className="glyphicon glyphicon-remove"></span></button>
        </div>
        <div className="job-info media-body">
          <div className="job-head">
            <span className="job-name">{this.props.singleItem.jobName}</span>
            <span className="job-date pull-right">{this.props.singleItem.jobDate}</span>
          </div>
          <div className="owner-name"><span className="label-item">Owner:</span>
          {this.props.singleItem.companyName}</div>
          <div className="job-notes">{this.props.singleItem.jobNotes}</div>
        </div>
      </li>
    ) // return
  } // render
}); //JobList

module.exports=JobList;
