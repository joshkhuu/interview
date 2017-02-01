var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var JobList = require('./JobList');
var AddJob = require('./AddJob');
var SearchJobs = require('./SearchJobs');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      addJobFormVisible: false,
      orderBy: 'jobName',
      orderDir: 'asc',
      queryText: '',
      myJobs: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = $.get('./js/data.json', function(result) {
      var tempJob = result;
      this.setState({
        myJobs: tempJob
      }); //setState
    }.bind(this));
  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  deleteMessage: function(item) {
    var allJobs = this.state.myJobs;
    var newJobs = _.without(allJobs, item);
    this.setState({
      myJobs: newJobs
    }); //setState
  }, //deleteMessage

  toggleAddDisplay: function() {
    var tempVisibility = !this.state.addJobFormVisible;
    this.setState({
      addJobFormVisible: tempVisibility
    }); //setState
  }, //toggleAddDisplay

  addItem: function(tempItem) {
    var tempJob = this.state.myJobs;
    tempJob.push(tempItem);
    this.setState({
      myJobs: tempJob
    }); //setState
  }, //addItem

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    }); //setState
  }, //reOrder

  searchJobsFunc(q) {
    this.setState({
      queryText: q
    }); //setState
  }, //searchJobsFunc

  render: function() {
    var filteredJobs = [];
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myJobs = this.state.myJobs;

    myJobs.forEach(function(item) {
      if(
        (item.jobName.toLowerCase().indexOf(queryText)!=-1) ||
        (item.companyName.toLowerCase().indexOf(queryText)!=-1) ||
        (item.jobDate.toLowerCase().indexOf(queryText)!=-1) ||
        (item.jobNotes.toLowerCase().indexOf(queryText)!=-1)
      ) {
        filteredJobs.push(item);
      }
    }); //forEach

    filteredJobs = _.orderBy(filteredJobs, function(item) {
      return item[orderBy].toLowerCase();
    }, orderDir);//orderBy

    filteredJobs = filteredJobs.map(function(item, index) {
      return(
        <JobList key = { index }
          singleItem = { item }
          whichItem = { item }
          onDelete = { this.deleteMessage } />
      ) //return
    }.bind(this)); //filteredJobs.map
    return (
      <div className="interface">
        <AddJob
          bodyVisible = { this.state.addJobFormVisible }
          handleToggle = { this.toggleAddDisplay }
          addJob = { this.addItem }
        />
        <SearchJobs
          orderBy = { this.state.orderBy }
          orderDir = { this.state.orderDir }
          onReOrder = { this.reOrder }
          onSearch = { this.searchJobsFunc }
        />
        <ul className="item-list media-list">{filteredJobs}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('jobs')
); //render
