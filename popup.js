var bgp = null;

function openDormitoryHome() {
	chrome.tabs.create({'url': "https://agdsn.de"});
	window.close();
}

function openTrafficSite() {
	chrome.tabs.create({'url':'https://agdsn.de/sipa/usertraffic'});
	window.close();
}

function internationalisation() {
	$("#dormitory_homepage").text(chrome.i18n.getMessage("dormitory_homepage"));
	$("#my_traffic").text(chrome.i18n.getMessage("my_traffic"));
}

function updateTraffic() {
	if (!bgp.usedTraffic) {
		$("#traffic_k").text(chrome.i18n.getMessage("indorm"));
		$("#traffic_err").show();
		$("#traffic").text(chrome.i18n.getMessage("error"));
		return;
	}
	$("#traffic_k").show();
	$("#traffic_err").hide();

	var quota = parseFloat(bgp.usedTraffic.quota);
	$("#traffic").text(chrome.i18n.getMessage("remaining") + " " + (quota / 1024 / 1024).toFixed(2) + " GiB");

	var ind = parseFloat(bgp.usedTraffic.traffic["in"]);
	var outd = parseFloat(bgp.usedTraffic.traffic["out"]);
	$("#traffic_k").text(chrome.i18n.getMessage("today") + " " +  (ind / 1024 / 1024 + outd / 1024 / 1024).toFixed(2) + " GiB / " + (bgp.quotaPerDay / 1024 / 1024).toFixed(2) + " GiB " + chrome.i18n.getMessage("used"));
}


$(function(){
	chrome.runtime.getBackgroundPage(function(bgPage){
		bgp = bgPage;

		internationalisation();
		updateTraffic();

		$("#dormitory_homepage").click(openDormitoryHome);
		$("#my_traffic").click(openTrafficSite);
	});
});
