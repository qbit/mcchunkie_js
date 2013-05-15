(function( helper, to, from, msg, store, sh_store, cb ) {
  'use strict';
  var resp;

  if ( msg === helper.botname + ': sshvpn' ) {
    resp = "SSH-BASED VIRTUAL PRIVATE NETWORKS - ssh contains support for Virtual Private Network (VPN) tunnelling using the tun(4) network pseudo-device, allowing two networks to be joined securely.  The sshd_config(5) configuration option PermitTunnel controls whether the server supports this, and at what level (layer 2 or 3 traffic).";
  }

  cb.call( null, to, from, resp );
});
