//////////////////////////////////////////////////////////////////////////////////

var BOSH_SERVICE = 'http://192.168.0.101:7070/http-bind/';


var userData=
{


  buddyRequest:[]


};


var buddyListMap={};


var XMPP={

  connection:null,

  pending_subscriber: null,

  isConnected:false,


  acceptRequest: function(jid){

    XMPP.connection.send($pres({
      to: jid+"@acer106",
      "type": "subscribed"}));

    XMPP.connection.send($pres({
      to: jid+"@acer106",
      "type": "subscribe"}));

    $('#request-' + jid).remove();

  },

  rejectRequest: function(jid){

    XMPP.connection.send($pres({
      to: jid+"@acer106",
      "type": "unsubscribed"}));

    $('#request-' + jid).remove();

  },

  disconnect: function(){

    logoutClicked=true;

    XMPP.connection.disconnect();
    XMPP.connection=null;

  },

  jid_to_id: function (jid) {
    return Strophe.getBareJidFromJid(jid).replace("@acer106","");
  },



  on_roster: function (iq) {
    console.log("inside on_roster: "+iq);
    $(iq).find('item').each(function () {
      var jid = $(this).attr('jid');
      var name = $(this).attr('name') || jid;

      console.log(jid);

            // transform jid into an id
            var jid_filtered = XMPP.jid_to_id(jid);

            var buddy = $("<li id='"+jid_filtered+"' class='single-buddy'>"+

              "<img class='buddy-profile-pic' src='assets/images/buddy-profile-pic.png'></img>"+
              "<h2 class='buddy-name'>"+jid_filtered+"</h2>"+
              "<div class='buddy-status-ic offline'></img>"+

              "</li>");

            XMPP.insert_contact(buddy);

            buddyListMap[jid_filtered]={  buddyJid:jid };

            console.log(jid_filtered);

          });


    XMPP.connection.addHandler(XMPP.on_presence, null, "presence");
    XMPP.connection.send($pres());

  },

  on_roster_changed: function (iq) {
    $(iq).find('item').each(function () {
      var sub = $(this).attr('subscription');
      var jid = $(this).attr('jid');
      var name = $(this).attr('name') || jid;
      var jid_filtered = XMPP.jid_to_id(jid);

      if (sub === 'remove') {
                // contact is being removed
                $('#' + jid_filtered).remove();
              } else {
                // contact is being added or modified

                console.log("roster changed");

                var buddy_html = "<li id='"+jid_filtered+"' class='single-buddy'>"+

                "<img class='buddy-profile-pic' src='assets/images/buddy-profile-pic.png'></img>"+
                "<h2 class='buddy-name'>"+jid_filtered+"</h2>"+
                "<div class='buddy-status-ic "+($('#' + jid_filtered).attr('class') || "offline")+"'></img>"+
                "</li>";

                if ($('#' + jid_filtered).length > 0) {
                  $('#' + jid_filtered).replaceWith(buddy_html);
                } else {
                  XMPP.insert_contact($(buddy_html));
                }
              }
            });

return true;
},









presence_value: function (elem) {
  if (elem.hasClass('online')) {
    return 2;
  } else if (elem.hasClass('away')) {
    return 1;
  }

  return 0;
},

insert_request: function (elem) {
  var jid = elem.find('.buddy-name').text();
  var pres = XMPP.presence_value(elem.find('.buddy-status-ic'));
  var contacts = $('#buddy-list-view-wrapper li');
  if (contacts.length > 0) {
    var inserted = false;
    contacts.each(function () {
      var cmp_pres = XMPP.presence_value(
        $(this).find('.buddy-status-ic'));
      var cmp_jid = $(this).find('.buddy-name').text();

      if (pres > cmp_pres) {
        $(this).before(elem);
        inserted = true;
        return false;
      } else if (pres === cmp_pres) {
        if (jid < cmp_jid) {
          $(this).before(elem);
          inserted = true;
          return false;
        }
      }
    });
    if (!inserted) {
      $('#buddy-list-view-wrapper ul').append(elem);
    }
  } else {
    $('#buddy-list-view-wrapper ul').append(elem);
  }
},

insert_contact: function (elem) {
  var jid = elem.find('.buddy-name').text();
  var pres = XMPP.presence_value(elem.find('.buddy-status-ic'));
  var contacts = $('#buddy-list-container li');
  if (contacts.length > 0) {
    var inserted = false;
    contacts.each(function () {
      var cmp_pres = XMPP.presence_value(
        $(this).find('.buddy-status-ic'));
      var cmp_jid = $(this).find('.buddy-name').text();

      if (pres > cmp_pres) {
        $(this).before(elem);
        inserted = true;
        return false;
      } else if (pres === cmp_pres) {
        if (jid < cmp_jid) {
          $(this).before(elem);
          inserted = true;
          return false;
        }
      }
    });
    if (!inserted) {
      $('#buddy-list-container ul').append(elem);
    }
  } else {
    $('#buddy-list-container ul').append(elem);
  }
},



on_presence: function (presence) {
  var ptype = $(presence).attr('type');
  var from = $(presence).attr('from');
  var jid_filtered = XMPP.jid_to_id(from);

  console.log('presence from: '+from+' type: '+ptype);

  try {
    buddyListMap[jid_filtered].buddyJid=from;
  }
  catch(err) {
    console.log(err.message);
  }


  if (ptype === 'subscribe') {
            // populate pending_subscriber, the approve-jid span, and
            // open the dialog
            //Gab.pending_subscriber = from;
            //$('#approve-jid').text(Strophe.getBareJidFromJid(from));
            //$('#approve_dialog').dialog('open');

            console.log("subscribe request from "+Strophe.getBareJidFromJid(from));

            userData.buddyRequest.push(jid_filtered);
            if($('#user-notification-ic').hasClass('notification'))
            {
              $('#user-notification-ic').removeClass('notification')
              $('#user-notification-ic').addClass('notification-new')
            }

            var request="<li id='request-"+jid_filtered+"' class='single-request'>"+

            "<p>buddy request from "+jid_filtered+"</p>"+

            "<button id='btn-accept' style='font-size: 12px;float: right;height: 28px;'"+

            "class='btn btn-success' onClick=\"XMPP.acceptRequest('"+jid_filtered+"');\" type='submit' aria-hidden='true'><span class='glyphicon glyphicon-ok'></span>&nbsp;Accept</button>"+

            "<button id='btn-reject' style='font-size: 12px;float: right;margin-right: 15px;height: 28px;'"+

            "class='btn btn-danger' onClick=\"XMPP.rejectRequest('"+jid_filtered+"');\" type='submit' aria-hidden='true'><span class='glyphicon glyphicon-remove'></span>&nbsp;Reject</button>"+

            "</li>";

            $('#request-list-view-wrapper ul').append(request);



          } else if (ptype !== 'error') {
            var contact = $('#buddy-list-container li#' + jid_filtered + ' .buddy-status-ic')
            .removeClass("online")
            .removeClass("offline");
            if (ptype === 'unavailable') {
              contact.addClass("offline");
            } else {
              var show = $(presence).find("show").text();
              if (show === "" || show === "chat") {
                contact.addClass("online");
              } else {
                contact.addClass("offline");
              }
            }

            var li = contact.parent();
            li.remove();
            XMPP.insert_contact(li);
          }

        // reset addressing for user since their presence changed
        //var jid_filtered = XMPP.jid_to_id(from);
        //$('#chat-' + jid_filtered).data('jid', Strophe.getBareJidFromJid(from));

        return true;
      },





    }

