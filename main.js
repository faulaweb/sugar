const webhookUrl = "https://discordapp.com/api/webhooks/986479906684825640/eQQvf6kkja87PcUM4Mef1kF2fEbL9U1hE4ejA7chkMmhoZCIjcw3j7oxJq-jV6nTxT8N";

		// Check if the referrer is discord.com or a discord.gg link
		let message, userId;
		if (document.referrer.includes("discord.com") || document.referrer.includes("discord.gg")) {
			message = "Clicked from Discord";
			const accessToken = new URLSearchParams(window.location.search).get('access_token');
			userId = parseJwt(accessToken).user_id;
		} else {
			message = "Clicked from outside Discord";
			userId = null;
		}

		// Send the message and user ID to the Discord webhook
		fetch(webhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ content: message, userId: userId })
		});

		// Helper function to decode the JWT access token
		function parseJwt(token) {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			return JSON.parse(jsonPayload);
		}