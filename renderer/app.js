/* ═══════════════════════════════════════════════════
   Pyix Bot Builder — App Logic v2 (Feature-Rich)
   ═══════════════════════════════════════════════════ */

// ─── Command Templates ───
const TEMPLATES = [
  {
    id: 'kick',
    name: 'Kick',
    icon: '🦶',
    description: 'Kick a member from the server',
    category: 'moderation',
    fields: {
      commandName: 'kick',
      aliases: '',
      cooldown: '3',
      response: '✅ **{target}** has been kicked by **{author}**!\nReason: {reason}',
      errorNoPerms: '❌ You do not have permission to kick members.',
      errorNoTarget: '❌ Please mention a user to kick.',
      errorCantKick: '❌ I cannot kick this user. They may have a higher role.',
      dmMessage: 'You have been kicked from **{server}** by **{author}**.\nReason: {reason}',
      requirePermission: 'KickMembers',
      sendDM: true,
      deleteCommand: true,
      logChannel: '',
      successEmbed: true,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'ban',
    name: 'Ban',
    icon: '🔨',
    description: 'Ban a member from the server',
    category: 'moderation',
    fields: {
      commandName: 'ban',
      response: '🔨 **{target}** has been banned by **{author}**!\nReason: {reason}',
      errorNoPerms: '❌ You do not have permission to ban members.',
      errorNoTarget: '❌ Please mention a user to ban.',
      errorCantBan: '❌ I cannot ban this user.',
      dmMessage: 'You have been banned from **{server}** by **{author}**.\nReason: {reason}',
      aliases: '',
      cooldown: '3',
      requirePermission: 'BanMembers',
      deleteDays: '7',
      sendDM: true,
      deleteCommand: true,
      logChannel: '',
      successEmbed: true,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'mute',
    name: 'Mute / Timeout',
    icon: '🔇',
    description: 'Timeout a member',
    category: 'moderation',
    fields: {
      commandName: 'mute',
      response: '🔇 **{target}** has been muted for **{duration}**.\nReason: {reason}',
      errorNoPerms: '❌ You do not have permission to timeout members.',
      errorNoTarget: '❌ Please mention a user to mute.',
      defaultDuration: '10m',
      dmMessage: 'You have been muted in **{server}** for **{duration}**.\nReason: {reason}',
      aliases: '',
      cooldown: '3',
      requirePermission: 'ModerateMembers',
      sendDM: true,
      deleteCommand: true,
      logChannel: '',
      successEmbed: true,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'unmute',
    name: 'Unmute',
    icon: '🔊',
    description: 'Remove timeout from a member',
    category: 'moderation',
    fields: {
      commandName: 'unmute',
      response: '🔊 **{target}** has been unmuted.',
      errorNoPerms: '❌ You do not have permission to manage timeouts.',
      errorNoTarget: '❌ Please mention a user to unmute.',
      aliases: '',
      cooldown: '3',
      requirePermission: 'ModerateMembers',
      deleteCommand: true,
      logChannel: '',
      successEmbed: true,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'warn',
    name: 'Warn',
    icon: '⚠️',
    description: 'Issue a warning to a member',
    category: 'moderation',
    fields: {
      commandName: 'warn',
      response: '⚠️ **{target}** has been warned by **{author}**.\nReason: {reason}\nTotal warnings: **{count}**',
      errorNoPerms: '❌ You do not have permission to warn members.',
      errorNoTarget: '❌ Please mention a user to warn.',
      dmMessage: 'You have been warned in **{server}**.\nReason: {reason}',
      aliases: '',
      cooldown: '3',
      requirePermission: 'ManageMessages',
      sendDM: true,
      deleteCommand: true,
      logChannel: '',
      successEmbed: true,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'clear',
    name: 'Clear / Purge',
    icon: '🧹',
    description: 'Delete multiple messages at once',
    category: 'moderation',
    fields: {
      commandName: 'clear',
      response: '🧹 Cleared **{count}** messages.',
      errorNoPerms: '❌ You do not have permission to manage messages.',
      errorNoAmount: '❌ Please specify the number of messages to clear (1-100).',
      maxMessages: '100',
      aliases: 'purge',
      cooldown: '5',
      requirePermission: 'ManageMessages',
      deleteCommand: true,
      autoDeleteResponse: true,
      autoDeleteDelay: '5',
      successEmbed: false,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'userinfo',
    name: 'User Info',
    icon: '👤',
    description: 'Display information about a user',
    category: 'info',
    fields: {
      commandName: 'userinfo',
      title: '👤 User Info — {target}',
      showAvatar: true,
      showJoinDate: true,
      showRoles: true,
      showId: true,
      embedColor: '#ff7814',
      requirePermission: '',
      deleteCommand: false
    }
  },
  {
    id: 'serverinfo',
    name: 'Server Info',
    icon: '🏠',
    description: 'Display server information',
    category: 'info',
    fields: {
      commandName: 'serverinfo',
      title: '🏠 Server Info — {server}',
      showMemberCount: true,
      showChannelCount: true,
      showOwner: true,
      showCreatedAt: true,
      embedColor: '#ff7814',
      requirePermission: '',
      deleteCommand: false
    }
  },
  {
    id: 'help',
    name: 'Help',
    icon: '❓',
    description: 'List all available commands',
    category: 'utility',
    fields: {
      commandName: 'help',
      title: '📖 Bot Commands',
      description: 'Here are all the commands you can use:',
      embedColor: '#ff7814',
      showPrefix: true,
      groupByCategory: true,
      deleteCommand: false
    }
  },
  {
    id: 'ping',
    name: 'Ping',
    icon: '🏓',
    description: 'Check bot latency',
    category: 'utility',
    fields: {
      commandName: 'ping',
      response: '🏓 Pong! Latency: **{latency}ms** | API: **{apiLatency}ms**',
      deleteCommand: false
    }
  },
  {
    id: 'say',
    name: 'Say',
    icon: '💬',
    description: 'Make the bot say something',
    category: 'utility',
    fields: {
      commandName: 'say',
      aliases: '',
      cooldown: '3',
      requirePermission: 'ManageMessages',
      deleteCommand: true,
      errorNoPerms: '❌ You need Manage Messages permission.',
      errorNoMessage: '❌ Please provide a message for me to say.'
    }
  },
  {
    id: 'announce',
    name: 'Announce',
    icon: '📢',
    description: 'Send an announcement embed',
    category: 'utility',
    fields: {
      commandName: 'announce',
      embedColor: '#ff7814',
      title: '📢 Announcement',
      aliases: '',
      cooldown: '5',
      requirePermission: 'ManageMessages',
      deleteCommand: true,
      mentionEveryone: false,
      targetChannel: ''
    }
  },
  {
    id: 'welcome',
    name: 'Welcome',
    icon: '👋',
    description: 'Greet new members when they join',
    category: 'events',
    fields: {
      commandName: 'welcome',
      message: 'Welcome to **{server}**, {mention}! 🎉\nYou are member #{count}!',
      channelId: '',
      sendDM: false,
      dmMessage: 'Welcome to **{server}**! We are glad to have you.',
      useEmbed: true,
      embedColor: '#ff7814',
      showAvatar: true
    }
  },
  {
    id: 'autorole',
    name: 'Auto Role',
    icon: '🏷️',
    description: 'Assign a role when a member joins',
    category: 'events',
    fields: {
      commandName: 'autorole',
      roleId: '',
      roleName: '',
      response: '🏷️ Auto-role has been set to **{role}**.',
      requirePermission: 'ManageRoles'
    }
  },
  {
    id: 'customcmd',
    name: 'Custom Reply',
    icon: '✨',
    description: 'Create a custom command with any response',
    category: 'custom',
    fields: {
      commandName: 'hello',
      aliases: '',
      cooldown: '0',
      response: 'Hey there, {author}! 👋',
      requirePermission: '',
      deleteCommand: false,
      useEmbed: false,
      embedColor: '#ff7814'
    }
  },
  {
    id: 'poll', name: 'Poll', icon: '📊', description: 'Create a reaction poll', category: 'utility',
    fields: { commandName: 'poll', aliases: 'vote', cooldown: '10', response: '📊 **Poll by {author}:**\n{args}', requirePermission: '', deleteCommand: true, useEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'giveaway', name: 'Giveaway', icon: '🎉', description: 'Start a giveaway', category: 'utility',
    fields: { commandName: 'giveaway', aliases: 'gstart', cooldown: '30', response: '🎉 **GIVEAWAY** 🎉\n{args}\n\nReact with 🎉 to enter!', requirePermission: 'ManageMessages', deleteCommand: true, useEmbed: true, embedColor: '#ff7814', duration: '1h' }
  },
  {
    id: 'ticket', name: 'Ticket', icon: '🎫', description: 'Create a support ticket channel', category: 'utility',
    fields: { commandName: 'ticket', aliases: 'support', cooldown: '30', response: '🎫 Ticket created! Check {channel}', errorNoPerms: '❌ I cannot create channels.', requirePermission: '', deleteCommand: false, ticketCategory: '', staffRoleId: '' }
  },
  {
    id: 'avatar', name: 'Avatar', icon: '🖼️', description: "Display a user's avatar", category: 'info',
    fields: { commandName: 'avatar', aliases: 'av,pfp', cooldown: '3', embedColor: '#ff7814', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'slowmode', name: 'Slowmode', icon: '🐌', description: 'Set channel slowmode', category: 'moderation',
    fields: { commandName: 'slowmode', aliases: 'slow', cooldown: '5', response: '🐌 Slowmode set to **{duration}** seconds.', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'lock', name: 'Lock Channel', icon: '🔒', description: 'Lock a channel', category: 'moderation',
    fields: { commandName: 'lock', aliases: '', cooldown: '5', response: '🔒 This channel has been locked by **{author}**.', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'unlock', name: 'Unlock Channel', icon: '🔓', description: 'Unlock a channel', category: 'moderation',
    fields: { commandName: 'unlock', aliases: '', cooldown: '5', response: '🔓 This channel has been unlocked by **{author}**.', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'unban', name: 'Unban', icon: '🔓', description: 'Unban a user by ID', category: 'moderation',
    fields: { commandName: 'unban', aliases: '', cooldown: '5', response: '✅ User has been unbanned.', errorNoPerms: '❌ You need Ban Members permission.', errorNoTarget: '❌ Provide a user ID.', requirePermission: 'BanMembers', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'snipe', name: 'Snipe', icon: '🔫', description: 'Show the last deleted message', category: 'utility',
    fields: { commandName: 'snipe', aliases: '', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false }
  },
  {
    id: '8ball', name: '8 Ball', icon: '🎱', description: 'Ask the magic 8 ball', category: 'fun',
    fields: { commandName: '8ball', aliases: 'eightball,ask', cooldown: '3', errorNoMessage: '❌ Please ask a question!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'coinflip', name: 'Coin Flip', icon: '🪙', description: 'Flip a coin', category: 'fun',
    fields: { commandName: 'coinflip', aliases: 'flip,coin', cooldown: '3', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'roll', name: 'Dice Roll', icon: '🎲', description: 'Roll dice (default d6)', category: 'fun',
    fields: { commandName: 'roll', aliases: 'dice', cooldown: '3', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'afk', name: 'AFK', icon: '💤', description: 'Set your AFK status', category: 'utility',
    fields: { commandName: 'afk', aliases: '', cooldown: '30', response: '💤 **{author}** is now AFK: {args}', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'roleinfo', name: 'Role Info', icon: '🏷️', description: 'Display info about a role', category: 'info',
    fields: { commandName: 'roleinfo', aliases: 'ri', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'nickname', name: 'Nickname', icon: '✏️', description: "Change a user's nickname", category: 'moderation',
    fields: { commandName: 'nick', aliases: 'nickname,setnick', cooldown: '5', response: '✏️ Nickname changed for **{target}**.', errorNoPerms: '❌ You need Manage Nicknames.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageNicknames', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'embedcmd', name: 'Custom Embed', icon: '📋', description: 'Send a custom embed (built with Embed Builder)', category: 'custom',
    fields: { commandName: 'embed', aliases: '', cooldown: '5', embedTitle: '', embedDesc: '', embedColor: '#ff7814', embedThumb: '', embedImage: '', embedFooter: '', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'report', name: 'Report', icon: '🚨', description: 'Report a user to staff', category: 'moderation',
    fields: { commandName: 'report', aliases: '', cooldown: '60', response: '🚨 Report submitted! Staff have been notified.', errorNoTarget: '❌ Please mention a user and provide a reason.', requirePermission: '', deleteCommand: true, reportChannelId: '', embedColor: '#ff7814', successEmbed: true }
  },
  {
    id: 'suggest', name: 'Suggest', icon: '💡', description: 'Submit a suggestion', category: 'utility',
    fields: { commandName: 'suggest', aliases: 'idea', cooldown: '30', response: '💡 Suggestion submitted!', errorNoMessage: '❌ Please provide a suggestion.', requirePermission: '', deleteCommand: true, suggestChannelId: '', embedColor: '#ff7814' }
  },
  {
    id: 'rps', name: 'Rock Paper Scissors', icon: '✊', description: 'Play rock paper scissors', category: 'fun',
    fields: { commandName: 'rps', aliases: '', cooldown: '3', errorNoMessage: '❌ Choose rock, paper, or scissors!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'trivia', name: 'Trivia', icon: '🧠', description: 'Answer a random trivia question', category: 'fun',
    fields: { commandName: 'trivia', aliases: 'quiz', cooldown: '10', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814', triviaTimeout: '15' }
  },
  {
    id: 'addrole', name: 'Add Role', icon: '➕', description: 'Give a role to a user', category: 'moderation',
    fields: { commandName: 'addrole', aliases: 'giverole', cooldown: '3', response: '✅ Added role **{role}** to **{target}**.', errorNoPerms: '❌ You need Manage Roles permission.', errorNoTarget: '❌ Mention a user and a role.', requirePermission: 'ManageRoles', deleteCommand: true, successEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'removerole', name: 'Remove Role', icon: '➖', description: 'Remove a role from a user', category: 'moderation',
    fields: { commandName: 'removerole', aliases: 'takerole', cooldown: '3', response: '✅ Removed role **{role}** from **{target}**.', errorNoPerms: '❌ You need Manage Roles permission.', errorNoTarget: '❌ Mention a user and a role.', requirePermission: 'ManageRoles', deleteCommand: true, successEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'reminder', name: 'Reminder', icon: '⏰', description: 'Set a reminder', category: 'utility',
    fields: { commandName: 'remind', aliases: 'remindme,timer', cooldown: '10', response: '⏰ Reminder set! I\'ll remind you in **{duration}**.', errorNoMessage: '❌ Usage: !remind <time> <message> (e.g. 10m Take a break)', requirePermission: '', deleteCommand: false, useEmbed: false, embedColor: '#ff7814' }
  },
  {
    id: 'banner', name: 'Banner', icon: '🖼️', description: "Show a user's banner", category: 'info',
    fields: { commandName: 'banner', aliases: '', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'whois', name: 'Whois', icon: '🔍', description: 'Detailed user lookup', category: 'info',
    fields: { commandName: 'whois', aliases: 'lookup', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false, showBadges: true, showBoosting: true }
  },
  {
    id: 'channelinfo', name: 'Channel Info', icon: '#️⃣', description: 'Display channel information', category: 'info',
    fields: { commandName: 'channelinfo', aliases: 'ci', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false }
  },
  {
    id: 'leaderboard', name: 'Warn Leaderboard', icon: '📋', description: 'Show most warned users', category: 'moderation',
    fields: { commandName: 'warnings', aliases: 'warnlist,warnboard', cooldown: '10', embedColor: '#ff7814', requirePermission: 'ManageMessages', deleteCommand: false, maxDisplay: '10' }
  },
  {
    id: 'leave', name: 'Leave Message', icon: '👋', description: 'Send a message when a member leaves', category: 'events',
    fields: { commandName: 'leave', message: '**{user}** just left **{server}**. We now have **{count}** members.', channelId: '', useEmbed: true, embedColor: '#ff7814' }
  },
  {
    id: 'boost', name: 'Boost Notification', icon: '💎', description: 'Announce when someone boosts the server', category: 'events',
    fields: { commandName: 'boost', message: '💎 **{user}** just boosted **{server}**! We now have **{count}** boosts! 🎉', channelId: '', useEmbed: true, embedColor: '#f47fff' }
  },

  // ─── Moderation (batch 2) ───
  { id: 'softban', name: 'Softban', icon: '🔨', description: 'Ban and unban to clear messages', category: 'moderation', fields: { commandName: 'softban', aliases: '', cooldown: '5', response: '🔨 **{target}** has been softbanned.', errorNoPerms: '❌ You need Ban Members permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'BanMembers', deleteCommand: true, deleteDays: '7', successEmbed: true, embedColor: '#ff7814' } },
  { id: 'nuke', name: 'Nuke Channel', icon: '💥', description: 'Clone and delete channel to clear all messages', category: 'moderation', fields: { commandName: 'nuke', aliases: '', cooldown: '30', response: '💥 Channel nuked by **{author}**!', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: false, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'voicekick', name: 'Voice Kick', icon: '🎤', description: 'Disconnect a user from voice', category: 'moderation', fields: { commandName: 'vkick', aliases: 'voicekick,disconnect', cooldown: '3', response: '🎤 **{target}** disconnected from voice.', errorNoPerms: '❌ You need Move Members permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'voicemute', name: 'Voice Mute', icon: '🔇', description: 'Server-mute a user in voice', category: 'moderation', fields: { commandName: 'vmute', aliases: 'voicemute', cooldown: '3', response: '🔇 **{target}** has been voice muted.', errorNoPerms: '❌ You need Mute Members permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'voicedeafen', name: 'Voice Deafen', icon: '🔕', description: 'Server-deafen a user in voice', category: 'moderation', fields: { commandName: 'vdeafen', aliases: 'voicedeafen', cooldown: '3', response: '🔕 **{target}** has been voice deafened.', errorNoPerms: '❌ You need Deafen Members permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'clearwarns', name: 'Clear Warnings', icon: '🧹', description: 'Clear all warnings for a user', category: 'moderation', fields: { commandName: 'clearwarns', aliases: 'cw,resetwarns', cooldown: '5', response: '🧹 Warnings cleared for **{target}**.', errorNoPerms: '❌ You need Manage Messages permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageMessages', deleteCommand: true, successEmbed: true, embedColor: '#ff7814' } },
  { id: 'warncount', name: 'Warn Count', icon: '📊', description: 'Check how many warnings a user has', category: 'moderation', fields: { commandName: 'warncount', aliases: 'warns,infractions', cooldown: '5', embedColor: '#ff7814', requirePermission: 'ManageMessages', deleteCommand: false } },
  { id: 'jail', name: 'Jail', icon: '⛓️', description: 'Restrict a user to a jail channel', category: 'moderation', fields: { commandName: 'jail', aliases: '', cooldown: '5', response: '⛓️ **{target}** has been jailed.', errorNoPerms: '❌ You need Manage Roles permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageRoles', deleteCommand: true, roleId: '', successEmbed: true, embedColor: '#ff7814' } },
  { id: 'unjail', name: 'Unjail', icon: '🔓', description: 'Release a user from jail', category: 'moderation', fields: { commandName: 'unjail', aliases: '', cooldown: '5', response: '🔓 **{target}** has been released from jail.', errorNoPerms: '❌ You need Manage Roles permission.', errorNoTarget: '❌ Mention a user.', requirePermission: 'ManageRoles', deleteCommand: true, roleId: '', successEmbed: true, embedColor: '#ff7814' } },
  { id: 'tempban', name: 'Temp Ban', icon: '⏱️', description: 'Temporarily ban a user', category: 'moderation', fields: { commandName: 'tempban', aliases: '', cooldown: '5', response: '⏱️ **{target}** banned for **{duration}**.', errorNoPerms: '❌ You need Ban Members permission.', errorNoTarget: '❌ Mention a user and duration.', requirePermission: 'BanMembers', deleteCommand: true, defaultDuration: '1d', successEmbed: true, embedColor: '#ff7814' } },
  { id: 'hide', name: 'Hide Channel', icon: '👁️‍🗨️', description: 'Hide a channel from @everyone', category: 'moderation', fields: { commandName: 'hide', aliases: '', cooldown: '5', response: '👁️‍🗨️ Channel hidden by **{author}**.', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'unhide', name: 'Unhide Channel', icon: '👁️', description: 'Unhide a channel', category: 'moderation', fields: { commandName: 'unhide', aliases: '', cooldown: '5', response: '👁️ Channel unhidden by **{author}**.', errorNoPerms: '❌ You need Manage Channels permission.', requirePermission: 'ManageChannels', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'dehoist', name: 'Dehoist', icon: '📝', description: 'Remove hoisting characters from nicknames', category: 'moderation', fields: { commandName: 'dehoist', aliases: '', cooldown: '10', response: '📝 Dehoisted **{count}** members.', errorNoPerms: '❌ You need Manage Nicknames permission.', requirePermission: 'ManageNicknames', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },
  { id: 'modnote', name: 'Mod Note', icon: '📝', description: 'Add a moderation note to a user', category: 'moderation', fields: { commandName: 'modnote', aliases: 'note', cooldown: '3', response: '📝 Note added for **{target}**.', errorNoPerms: '❌ You need Manage Messages permission.', errorNoTarget: '❌ Mention a user and note.', requirePermission: 'ManageMessages', deleteCommand: true, successEmbed: true, embedColor: '#ff7814' } },
  { id: 'massrole', name: 'Mass Role', icon: '👥', description: 'Give a role to all members', category: 'moderation', fields: { commandName: 'massrole', aliases: '', cooldown: '30', response: '👥 Adding role to all members...', errorNoPerms: '❌ You need Manage Roles permission.', errorNoTarget: '❌ Mention a role.', requirePermission: 'ManageRoles', deleteCommand: true, successEmbed: false, embedColor: '#ff7814' } },

  // ─── Utility (batch 2) ───
  { id: 'calc', name: 'Calculator', icon: '🔢', description: 'Evaluate a math expression', category: 'utility', fields: { commandName: 'calc', aliases: 'math,evaluate', cooldown: '3', errorNoMessage: '❌ Provide a math expression.', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'choose', name: 'Choose', icon: '🤔', description: 'Pick randomly between options', category: 'utility', fields: { commandName: 'choose', aliases: 'pick,decide', cooldown: '3', errorNoMessage: '❌ Provide options separated by |', requirePermission: '', deleteCommand: false, useEmbed: false, embedColor: '#ff7814' } },
  { id: 'rate', name: 'Rate', icon: '⭐', description: 'Rate something out of 10', category: 'utility', fields: { commandName: 'rate', aliases: '', cooldown: '3', errorNoMessage: '❌ Tell me what to rate!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'uptime', name: 'Uptime', icon: '⏱️', description: 'Show bot uptime', category: 'utility', fields: { commandName: 'uptime', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'invitebot', name: 'Invite', icon: '📨', description: 'Get bot invite link', category: 'utility', fields: { commandName: 'invite', aliases: 'inv', cooldown: '5', response: '📨 **Invite me to your server:**\nhttps://discord.com/api/oauth2/authorize?client_id={botid}&permissions=8&scope=bot', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'botinfo', name: 'Bot Info', icon: '🤖', description: 'Display bot information', category: 'utility', fields: { commandName: 'botinfo', aliases: 'about,bi', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'membercount', name: 'Member Count', icon: '👥', description: 'Show server member count', category: 'utility', fields: { commandName: 'membercount', aliases: 'mc', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'reverse', name: 'Reverse Text', icon: '🔄', description: 'Reverse any text', category: 'utility', fields: { commandName: 'reverse', aliases: '', cooldown: '3', errorNoMessage: '❌ Provide text to reverse.', requirePermission: '', deleteCommand: false } },
  { id: 'binary', name: 'Binary', icon: '0️⃣', description: 'Convert text to binary', category: 'utility', fields: { commandName: 'binary', aliases: '', cooldown: '3', errorNoMessage: '❌ Provide text to convert.', requirePermission: '', deleteCommand: false } },
  { id: 'hex', name: 'Hex', icon: '🔡', description: 'Convert text to hexadecimal', category: 'utility', fields: { commandName: 'hex', aliases: '', cooldown: '3', errorNoMessage: '❌ Provide text to convert.', requirePermission: '', deleteCommand: false } },
  { id: 'base64', name: 'Base64', icon: '🔐', description: 'Encode/decode base64', category: 'utility', fields: { commandName: 'base64', aliases: 'b64', cooldown: '3', errorNoMessage: '❌ Provide text to encode.', requirePermission: '', deleteCommand: false } },
  { id: 'enlarge', name: 'Enlarge Emoji', icon: '🔍', description: 'Display an emoji in full size', category: 'utility', fields: { commandName: 'enlarge', aliases: 'jumbo,big', cooldown: '3', errorNoMessage: '❌ Provide an emoji.', requirePermission: '', deleteCommand: false, embedColor: '#ff7814' } },
  { id: 'servericon', name: 'Server Icon', icon: '🖼️', description: 'Display the server icon', category: 'utility', fields: { commandName: 'servericon', aliases: 'icon,sicon', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'rolecount', name: 'Role Count', icon: '🏷️', description: 'Show total number of roles', category: 'utility', fields: { commandName: 'rolecount', aliases: 'rc', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'channelcount', name: 'Channel Count', icon: '#️⃣', description: 'Show total number of channels', category: 'utility', fields: { commandName: 'channelcount', aliases: 'cc', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'firstmsg', name: 'First Message', icon: '📜', description: 'Get the first message in a channel', category: 'utility', fields: { commandName: 'firstmsg', aliases: 'firstmessage', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'timestamp', name: 'Timestamp', icon: '🕐', description: 'Get Discord timestamp from a date', category: 'utility', fields: { commandName: 'timestamp', aliases: 'ts', cooldown: '3', errorNoMessage: '❌ Provide a date (YYYY-MM-DD).', requirePermission: '', deleteCommand: false } },
  { id: 'colorinfo', name: 'Color Info', icon: '🎨', description: 'Display info about a hex color', category: 'utility', fields: { commandName: 'color', aliases: 'colorinfo', cooldown: '3', errorNoMessage: '❌ Provide a hex color (#ff7814).', requirePermission: '', deleteCommand: false, embedColor: '#ff7814' } },
  { id: 'countdown', name: 'Countdown', icon: '⏳', description: 'Start a countdown timer', category: 'utility', fields: { commandName: 'countdown', aliases: '', cooldown: '10', errorNoMessage: '❌ Provide seconds (e.g. 10).', requirePermission: '', deleteCommand: false } },
  { id: 'embedsay', name: 'Embed Say', icon: '📋', description: 'Make the bot say something in an embed', category: 'utility', fields: { commandName: 'embedsay', aliases: 'esay', cooldown: '3', requirePermission: 'ManageMessages', deleteCommand: true, errorNoPerms: '❌ You need Manage Messages.', errorNoMessage: '❌ Provide a message.', embedColor: '#ff7814' } },
  { id: 'snipeedit', name: 'Edit Snipe', icon: '✏️', description: 'Show last edited message', category: 'utility', fields: { commandName: 'editsnipe', aliases: 'esnipe', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'steal', name: 'Steal Emoji', icon: '😏', description: 'Add an emoji to your server', category: 'utility', fields: { commandName: 'steal', aliases: 'addemoji', cooldown: '10', errorNoMessage: '❌ Provide an emoji to steal.', errorNoPerms: '❌ You need Manage Emojis.', requirePermission: 'ManageChannels', deleteCommand: false, embedColor: '#ff7814' } },
  { id: 'afklist', name: 'AFK List', icon: '💤', description: 'Show all AFK users', category: 'utility', fields: { commandName: 'afklist', aliases: '', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'remindlist', name: 'Remind List', icon: '📋', description: 'Show active reminders', category: 'utility', fields: { commandName: 'reminders', aliases: 'remindlist', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'nickname-self', name: 'Set Nickname', icon: '✏️', description: 'Change your own nickname', category: 'utility', fields: { commandName: 'setnick', aliases: 'mynick', cooldown: '10', response: '✏️ Your nickname has been changed!', errorNoMessage: '❌ Provide a new nickname.', requirePermission: '', deleteCommand: false } },

  // ─── Fun (batch 2) ───
  { id: 'joke', name: 'Joke', icon: '😂', description: 'Tell a random joke', category: 'fun', fields: { commandName: 'joke', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'meme', name: 'Meme', icon: '🖼️', description: 'Generate a random meme text', category: 'fun', fields: { commandName: 'meme', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'roast', name: 'Roast', icon: '🔥', description: 'Roast someone (playful)', category: 'fun', fields: { commandName: 'roast', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false } },
  { id: 'compliment', name: 'Compliment', icon: '💖', description: 'Give someone a compliment', category: 'fun', fields: { commandName: 'compliment', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false } },
  { id: 'fact', name: 'Random Fact', icon: '📚', description: 'Share a random fun fact', category: 'fun', fields: { commandName: 'fact', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'quote', name: 'Quote', icon: '💬', description: 'Share an inspirational quote', category: 'fun', fields: { commandName: 'quote', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'fortune', name: 'Fortune Cookie', icon: '🥠', description: 'Open a fortune cookie', category: 'fun', fields: { commandName: 'fortune', aliases: 'cookie', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'ship', name: 'Ship', icon: '💘', description: 'Check love compatibility', category: 'fun', fields: { commandName: 'ship', aliases: 'love,match', cooldown: '5', errorNoTarget: '❌ Mention two users to ship!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff69b4' } },
  { id: 'hug', name: 'Hug', icon: '🤗', description: 'Give someone a hug', category: 'fun', fields: { commandName: 'hug', aliases: '', cooldown: '3', errorNoTarget: '❌ Mention someone to hug!', requirePermission: '', deleteCommand: false } },
  { id: 'slap', name: 'Slap', icon: '👋', description: 'Slap someone', category: 'fun', fields: { commandName: 'slap', aliases: '', cooldown: '3', errorNoTarget: '❌ Mention someone to slap!', requirePermission: '', deleteCommand: false } },
  { id: 'pat', name: 'Pat', icon: '🤚', description: 'Pat someone on the head', category: 'fun', fields: { commandName: 'pat', aliases: 'headpat', cooldown: '3', errorNoTarget: '❌ Mention someone to pat!', requirePermission: '', deleteCommand: false } },
  { id: 'kiss', name: 'Kiss', icon: '💋', description: 'Kiss someone', category: 'fun', fields: { commandName: 'kiss', aliases: '', cooldown: '3', errorNoTarget: '❌ Mention someone to kiss!', requirePermission: '', deleteCommand: false } },
  { id: 'wink', name: 'Wink', icon: '😉', description: 'Wink at someone', category: 'fun', fields: { commandName: 'wink', aliases: '', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'poke', name: 'Poke', icon: '👉', description: 'Poke someone', category: 'fun', fields: { commandName: 'poke', aliases: '', cooldown: '3', errorNoTarget: '❌ Mention someone to poke!', requirePermission: '', deleteCommand: false } },
  { id: 'bite', name: 'Bite', icon: '😬', description: 'Bite someone', category: 'fun', fields: { commandName: 'bite', aliases: '', cooldown: '3', errorNoTarget: '❌ Mention someone to bite!', requirePermission: '', deleteCommand: false } },
  { id: 'highfive', name: 'High Five', icon: '✋', description: 'High five someone', category: 'fun', fields: { commandName: 'highfive', aliases: 'h5', cooldown: '3', errorNoTarget: '❌ Mention someone!', requirePermission: '', deleteCommand: false } },
  { id: 'dab', name: 'Dab', icon: '💃', description: 'Hit the dab', category: 'fun', fields: { commandName: 'dab', aliases: '', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'cry', name: 'Cry', icon: '😢', description: 'Express sadness', category: 'fun', fields: { commandName: 'cry', aliases: 'sad', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'laugh', name: 'Laugh', icon: '😆', description: 'Laugh out loud', category: 'fun', fields: { commandName: 'laugh', aliases: 'lol', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'facepalm', name: 'Facepalm', icon: '🤦', description: 'Express disappointment', category: 'fun', fields: { commandName: 'facepalm', aliases: 'fp', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'tableflip', name: 'Table Flip', icon: '🪑', description: 'Flip a table in anger', category: 'fun', fields: { commandName: 'tableflip', aliases: 'flip', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'unflip', name: 'Unflip', icon: '🪑', description: 'Put the table back', category: 'fun', fields: { commandName: 'unflip', aliases: '', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'wyr', name: 'Would You Rather', icon: '🤷', description: 'Get a would you rather question', category: 'fun', fields: { commandName: 'wyr', aliases: 'wouldyourather', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'tod', name: 'Truth or Dare', icon: '🎯', description: 'Get a truth or dare prompt', category: 'fun', fields: { commandName: 'tod', aliases: 'truthordare', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'numberguess', name: 'Number Guess', icon: '🔢', description: 'Guess a number 1-100', category: 'fun', fields: { commandName: 'guess', aliases: 'numguess', cooldown: '10', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'slots', name: 'Slots', icon: '🎰', description: 'Play the slot machine', category: 'fun', fields: { commandName: 'slots', aliases: 'slot', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'gayrate', name: 'Gay Rate', icon: '🏳️‍🌈', description: 'How gay is someone?', category: 'fun', fields: { commandName: 'gayrate', aliases: 'howgay', cooldown: '3', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'simprate', name: 'Simp Rate', icon: '💕', description: 'How much of a simp?', category: 'fun', fields: { commandName: 'simprate', aliases: 'howsimp', cooldown: '3', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'iqtest', name: 'IQ Test', icon: '🧠', description: 'Check your IQ (for fun)', category: 'fun', fields: { commandName: 'iq', aliases: 'iqtest', cooldown: '3', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'howcute', name: 'Cute Rate', icon: '🥰', description: 'How cute is someone?', category: 'fun', fields: { commandName: 'howcute', aliases: 'cute', cooldown: '3', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'mock', name: 'Mock', icon: '🤪', description: 'mOcK sOmEoNe\'s TeXt', category: 'fun', fields: { commandName: 'mock', aliases: 'spongebob', cooldown: '3', errorNoMessage: '❌ Provide text to mock.', requirePermission: '', deleteCommand: false } },
  { id: 'uwuify', name: 'UwUify', icon: '✨', description: 'UwUify your text', category: 'fun', fields: { commandName: 'uwu', aliases: 'uwuify,owo', cooldown: '3', errorNoMessage: '❌ Provide text to uwuify.', requirePermission: '', deleteCommand: false } },
  { id: 'ascii', name: 'ASCII Art', icon: '🔠', description: 'Convert text to ASCII art', category: 'fun', fields: { commandName: 'ascii', aliases: '', cooldown: '5', errorNoMessage: '❌ Provide text to convert.', requirePermission: '', deleteCommand: false } },
  { id: 'emojify', name: 'Emojify', icon: '🔤', description: 'Convert text to emoji letters', category: 'fun', fields: { commandName: 'emojify', aliases: '', cooldown: '3', errorNoMessage: '❌ Provide text to emojify.', requirePermission: '', deleteCommand: false } },
  { id: 'clap', name: 'Clapify', icon: '👏', description: 'Add 👏 between 👏 words', category: 'fun', fields: { commandName: 'clap', aliases: 'clapify', cooldown: '3', errorNoMessage: '❌ Provide text to clapify.', requirePermission: '', deleteCommand: false } },
  { id: 'pp', name: 'PP Size', icon: '📏', description: 'Measure PP size (for fun)', category: 'fun', fields: { commandName: 'pp', aliases: 'ppsize', cooldown: '3', requirePermission: '', deleteCommand: false } },
  { id: 'fight', name: 'Fight', icon: '⚔️', description: 'Fight another user', category: 'fun', fields: { commandName: 'fight', aliases: 'battle', cooldown: '5', errorNoTarget: '❌ Mention someone to fight!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'marry', name: 'Marry', icon: '💍', description: 'Propose to someone', category: 'fun', fields: { commandName: 'marry', aliases: 'propose', cooldown: '10', errorNoTarget: '❌ Mention someone to propose to!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff69b4' } },
  { id: 'divorce', name: 'Divorce', icon: '💔', description: 'Divorce someone', category: 'fun', fields: { commandName: 'divorce', aliases: '', cooldown: '10', errorNoTarget: '❌ Mention someone to divorce.', requirePermission: '', deleteCommand: false } },
  { id: 'pickup', name: 'Pickup Line', icon: '💝', description: 'Get a random pickup line', category: 'fun', fields: { commandName: 'pickup', aliases: 'pickupline', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff69b4' } },
  { id: 'dare', name: 'Dare', icon: '🎯', description: 'Get a random dare', category: 'fun', fields: { commandName: 'dare', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'truth', name: 'Truth', icon: '❓', description: 'Get a random truth question', category: 'fun', fields: { commandName: 'truth', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'paranoia', name: 'Paranoia', icon: '😱', description: 'Get a paranoia question', category: 'fun', fields: { commandName: 'paranoia', aliases: '', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'neverhavei', name: 'Never Have I Ever', icon: '🙅', description: 'Get a NHIE prompt', category: 'fun', fields: { commandName: 'nhie', aliases: 'neverhaveiever', cooldown: '5', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },

  // ─── Info (batch 2) ───
  { id: 'emojilist', name: 'Emoji List', icon: '😀', description: 'List all server emojis', category: 'info', fields: { commandName: 'emojilist', aliases: 'emojis', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'boosters', name: 'Boosters', icon: '💎', description: 'List server boosters', category: 'info', fields: { commandName: 'boosters', aliases: 'boosts', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'perms', name: 'Permissions', icon: '🔑', description: 'Check user permissions', category: 'info', fields: { commandName: 'perms', aliases: 'permissions', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'whohas', name: 'Who Has Role', icon: '👥', description: 'List members with a specific role', category: 'info', fields: { commandName: 'whohas', aliases: 'inrole', cooldown: '10', errorNoTarget: '❌ Mention a role.', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'roles', name: 'Roles List', icon: '🏷️', description: 'List all server roles', category: 'info', fields: { commandName: 'roles', aliases: 'rolelist', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'emotecount', name: 'Emoji Stats', icon: '📊', description: 'Show emoji usage stats', category: 'info', fields: { commandName: 'emojistats', aliases: 'emotecount', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'oldestmember', name: 'Oldest Member', icon: '👴', description: 'Show the oldest server member', category: 'info', fields: { commandName: 'oldest', aliases: 'oldestmember', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'newestmember', name: 'Newest Member', icon: '👶', description: 'Show the newest server member', category: 'info', fields: { commandName: 'newest', aliases: 'newestmember', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'banlist', name: 'Ban List', icon: '🔨', description: 'Show list of banned users', category: 'info', fields: { commandName: 'banlist', aliases: 'bans', cooldown: '10', embedColor: '#ff7814', requirePermission: 'BanMembers', deleteCommand: false, errorNoPerms: '❌ You need Ban Members permission.' } },
  { id: 'invites', name: 'Invite Leaderboard', icon: '📨', description: 'Show top inviters', category: 'info', fields: { commandName: 'invites', aliases: 'invitetop', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },
  { id: 'botstatus', name: 'Bot Status', icon: '📡', description: 'Show bot memory, ping, and guild count', category: 'info', fields: { commandName: 'status', aliases: 'botstatus', cooldown: '5', embedColor: '#ff7814', requirePermission: '', deleteCommand: false } },

  // ─── Events (batch 2) ───
  { id: 'membermilestone', name: 'Member Milestone', icon: '🎊', description: 'Celebrate member count milestones', category: 'events', fields: { commandName: 'milestone', message: '🎊 We just hit **{count}** members in **{server}**! 🎉', channelId: '', useEmbed: true, embedColor: '#ff7814', milestoneInterval: '100' } },
  { id: 'voicelog', name: 'Voice Log', icon: '🎙️', description: 'Log voice channel joins/leaves', category: 'events', fields: { commandName: 'voicelog', channelId: '', useEmbed: true, embedColor: '#ff7814' } },
  { id: 'banannounce', name: 'Ban Announce', icon: '🔨', description: 'Announce when someone is banned', category: 'events', fields: { commandName: 'banannounce', message: '🔨 **{user}** has been banned from **{server}**.', channelId: '', useEmbed: true, embedColor: '#ef4444' } },
  { id: 'channelcreate', name: 'Channel Create Log', icon: '📝', description: 'Log when a channel is created', category: 'events', fields: { commandName: 'channelcreatelog', channelId: '', useEmbed: true, embedColor: '#22c55e' } },
  { id: 'channeldelete', name: 'Channel Delete Log', icon: '🗑️', description: 'Log when a channel is deleted', category: 'events', fields: { commandName: 'channeldeletelog', channelId: '', useEmbed: true, embedColor: '#ef4444' } },
  { id: 'rolecreate', name: 'Role Create Log', icon: '🏷️', description: 'Log when a role is created', category: 'events', fields: { commandName: 'rolecreatelog', channelId: '', useEmbed: true, embedColor: '#3b82f6' } },
  { id: 'roledelete', name: 'Role Delete Log', icon: '🏷️', description: 'Log when a role is deleted', category: 'events', fields: { commandName: 'roledeletelog', channelId: '', useEmbed: true, embedColor: '#ef4444' } },

  // ─── Custom (batch 2) ───
  { id: 'rules', name: 'Rules', icon: '📜', description: 'Display server rules', category: 'custom', fields: { commandName: 'rules', aliases: '', cooldown: '5', response: '📜 **Server Rules**\n1. Be respectful\n2. No spam\n3. No NSFW\n4. Follow Discord TOS\n5. Have fun!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'faq', name: 'FAQ', icon: '❓', description: 'Display frequently asked questions', category: 'custom', fields: { commandName: 'faq', aliases: '', cooldown: '5', response: '❓ **FAQ**\nQ: How do I get roles?\nA: Check the roles channel!\nQ: When are events?\nA: Check announcements!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'socials', name: 'Socials', icon: '🌐', description: 'Display social media links', category: 'custom', fields: { commandName: 'socials', aliases: 'social,links', cooldown: '5', response: '🌐 **Our Socials**\n🐦 Twitter: [link]\n📺 YouTube: [link]\n📸 Instagram: [link]', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'apply', name: 'Application', icon: '📝', description: 'Start a staff application', category: 'custom', fields: { commandName: 'apply', aliases: 'application', cooldown: '60', response: '📝 Your application has been submitted!', errorNoPerms: '', requirePermission: '', deleteCommand: true, useEmbed: true, embedColor: '#ff7814', targetChannel: '' } },
  { id: 'selfrole', name: 'Self Role', icon: '🏷️', description: 'Assign yourself a role', category: 'custom', fields: { commandName: 'selfrole', aliases: 'iam', cooldown: '5', response: '🏷️ Role assigned!', errorNoTarget: '❌ Mention a role.', requirePermission: '', deleteCommand: false, roleId: '' } },
  { id: 'colorrole', name: 'Color Role', icon: '🎨', description: 'Change your name color', category: 'custom', fields: { commandName: 'colorrole', aliases: 'color', cooldown: '10', response: '🎨 Your color has been updated!', errorNoMessage: '❌ Provide a hex color.', requirePermission: '', deleteCommand: false, embedColor: '#ff7814' } },
  { id: 'daily', name: 'Daily Reward', icon: '🎁', description: 'Claim daily rewards', category: 'custom', fields: { commandName: 'daily', aliases: '', cooldown: '86400', response: '🎁 You claimed your daily reward!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'balance', name: 'Balance', icon: '💰', description: 'Check your balance', category: 'custom', fields: { commandName: 'balance', aliases: 'bal,money', cooldown: '3', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'work', name: 'Work', icon: '💼', description: 'Work to earn coins', category: 'custom', fields: { commandName: 'work', aliases: '', cooldown: '3600', response: '💼 You worked and earned **{amount}** coins!', requirePermission: '', deleteCommand: false, useEmbed: true, embedColor: '#ff7814' } },
  { id: 'leaderboard-eco', name: 'Economy Leaderboard', icon: '🏆', description: 'Show richest users', category: 'custom', fields: { commandName: 'rich', aliases: 'richest,lb', cooldown: '10', embedColor: '#ff7814', requirePermission: '', deleteCommand: false, maxDisplay: '10' } }
];

// ─── State ───
let commands = [];
let selectedCommandId = null;
let activeCategoryFilter = 'all';
let activeTab = 'dashboard';
let embedFields = [];
let lastGeneratedCode = '';
let autoResponsesList = [];
let logConfig = { msgDelete: false, msgEdit: false, memberJoin: false, memberLeave: false, logChannelId: '' };

// ─── DOM Refs ───
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const pickerCatsEl = $('#pickerCats');
const pickerTmplEl = $('#pickerTemplates');
const commandCardsEl = $('#commandCards');
const emptyStateEl = $('#emptyState');
const editorPanel = $('#editorPanel');
const editorTitle = $('#editorTitle');
const editorBody = $('#editorBody');
const editorPreview = $('#editorPreview');
const searchInput = $('#searchInput');

// ─── Init ───
async function init() {
  renderTemplates();
  bindAddPanel();
  bindGlobalEvents();
  bindNavigation();
  bindCategoryFilter();
  bindEditorTabs();
  bindEmbedBuilder();
  bindCodePreview();
  bindAutoResponses();
  bindCommandType();
  await autoLoadState();
  updateStats();
  updateDashboardExtras();
  startAutoSave();
}

// ─── Auto-Save / Auto-Load ───
let autoSaveTimer = null;
function scheduleAutoSave() {
  if (autoSaveTimer) clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => autoSaveState(), 1500);
}

function gatherFullState() {
  return {
    botName: $('#botName')?.value || '',
    prefix: $('#botPrefix')?.value || '!',
    token: $('#botToken')?.value || '',
    commandType: $('#commandType')?.value || 'prefix',
    status: $('#botStatus')?.value || 'online',
    activityType: $('#botActivityType')?.value || '0',
    activity: $('#botActivity')?.value || '',
    commands: commands,
    automod: getAutoModConfig(),
    autoResponses: autoResponsesList,
    logConfig: getLogConfig()
  };
}

async function autoSaveState() {
  const state = gatherFullState();
  await window.pyix.autoSave(state);
}

async function autoLoadState() {
  const result = await window.pyix.autoLoad();
  if (result.success && result.config) {
    const cfg = result.config;
    if (cfg.botName) $('#botName').value = cfg.botName;
    if (cfg.prefix) $('#botPrefix').value = cfg.prefix;
    if (cfg.token) $('#botToken').value = cfg.token;
    if (cfg.commandType && $('#commandType')) {
      $('#commandType').value = cfg.commandType;
      bindCommandType();
    }
    if (cfg.status) $('#botStatus').value = cfg.status;
    if (cfg.activityType && $('#botActivityType')) $('#botActivityType').value = cfg.activityType;
    if (cfg.activity) $('#botActivity').value = cfg.activity;
    if (cfg.commands) commands = cfg.commands;
    if (cfg.autoResponses) { autoResponsesList = cfg.autoResponses; renderAutoResponses(); }
    if (cfg.logConfig) {
      const lc = cfg.logConfig;
      if ($('#logMsgDelete')) $('#logMsgDelete').checked = lc.msgDelete || false;
      if ($('#logMsgEdit')) $('#logMsgEdit').checked = lc.msgEdit || false;
      if ($('#logMemberJoin')) $('#logMemberJoin').checked = lc.memberJoin || false;
      if ($('#logMemberLeave')) $('#logMemberLeave').checked = lc.memberLeave || false;
      if ($('#logChannelId')) $('#logChannelId').value = lc.logChannelId || '';
    }
    if (cfg.automod) {
      const am = cfg.automod;
      if ($('#automodSpam')) $('#automodSpam').checked = am.antiSpam || false;
      if ($('#automodLinks')) $('#automodLinks').checked = am.antiLinks || false;
      if ($('#automodCaps')) $('#automodCaps').checked = am.antiCaps || false;
      if ($('#automodWords')) $('#automodWords').checked = am.badWords || false;
      if ($('#automodMassMention')) $('#automodMassMention').checked = am.massMention || false;
      if ($('#automodInvites')) $('#automodInvites').checked = am.antiInvites || false;
      if ($('#automodAction')) $('#automodAction').value = am.action || 'delete';
      if ($('#automodLogChannel')) $('#automodLogChannel').value = am.logChannel || '';
      if ($('#automodExemptRole')) $('#automodExemptRole').value = am.exemptRole || '';
      if ($('#badWordsList')) $('#badWordsList').value = (am.badWordsList || []).join(', ');
    }
    selectedCommandId = null;
    editorPanel.classList.add('hidden');
    renderCommands();
  }
}

function startAutoSave() {
  // Listen to all inputs/selects/textareas in settings for changes
  document.querySelectorAll('#pageSettings input, #pageSettings select, #pageSettings textarea').forEach(el => {
    el.addEventListener('input', scheduleAutoSave);
    el.addEventListener('change', scheduleAutoSave);
  });
  // Listen to automod inputs
  document.querySelectorAll('#pageAutomod input, #pageAutomod select, #pageAutomod textarea').forEach(el => {
    el.addEventListener('input', scheduleAutoSave);
    el.addEventListener('change', scheduleAutoSave);
  });
  // Observe commands array changes via a proxy wrapper
  const origPush = commands.push.bind(commands);
  const origSplice = commands.splice.bind(commands);
  commands.push = function(...args) { const r = origPush(...args); scheduleAutoSave(); return r; };
  commands.splice = function(...args) { const r = origSplice(...args); scheduleAutoSave(); return r; };
}

function bindCommandType() {
  const sel = $('#commandType');
  const prefixGroup = $('#prefixGroup');
  if (!sel) return;
  const update = () => {
    if (sel.value === 'slash') prefixGroup.style.display = 'none';
    else prefixGroup.style.display = '';
  };
  sel.addEventListener('change', update);
  update();
}

// ─── Add Command Picker ───
const CATEGORY_META = {
  moderation: { label: 'Moderation', icon: '🛡️' },
  utility: { label: 'Utility', icon: '🔧' },
  fun: { label: 'Fun', icon: '🎮' },
  info: { label: 'Info', icon: '📊' },
  events: { label: 'Events', icon: '📡' },
  custom: { label: 'Custom', icon: '✨' }
};
const CAT_ORDER = ['moderation', 'utility', 'fun', 'info', 'events', 'custom'];
let pickerActiveCat = 'moderation';

function renderTemplates() {
  // Build category sidebar
  pickerCatsEl.innerHTML = CAT_ORDER.map(cat => {
    const meta = CATEGORY_META[cat];
    return `<button class="picker-cat-btn${cat === pickerActiveCat ? ' active' : ''}" data-cat="${cat}">
      <span class="picker-cat-icon">${meta.icon}</span>${meta.label}
    </button>`;
  }).join('');

  pickerCatsEl.querySelectorAll('.picker-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pickerActiveCat = btn.dataset.cat;
      renderTemplates();
    });
  });

  // Build template list for active category
  const templates = TEMPLATES.filter(t => t.category === pickerActiveCat);
  pickerTmplEl.innerHTML = templates.map(t => `
    <button class="picker-tmpl-btn" data-id="${t.id}">
      <span class="picker-tmpl-icon">${t.icon}</span>
      <div class="picker-tmpl-info">
        <div class="picker-tmpl-name">${t.name}</div>
        <div class="picker-tmpl-desc">${t.description}</div>
      </div>
    </button>
  `).join('');

  pickerTmplEl.querySelectorAll('.picker-tmpl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      addCommand(btn.dataset.id);
      $('#addCmdModal').classList.add('hidden');
    });
  });
}

function bindAddPanel() {
  const openBtn = $('#openAddPanel');
  const closeBtn = $('#closeAddPanel');
  const modal = $('#addCmdModal');
  if (openBtn) openBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderTemplates();
  });
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  if (modal) modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

// ─── Add Command ───
function addCommand(templateId) {
  const template = TEMPLATES.find(t => t.id === templateId);
  if (!template) return;

  const cmd = {
    uid: generateUID(),
    templateId: template.id,
    name: template.name,
    icon: template.icon,
    description: template.description,
    category: template.category,
    enabled: true,
    fields: JSON.parse(JSON.stringify(template.fields)),
    logic: { conditions: [], actions: [], elseActions: [], variables: [] }
  };

  commands.push(cmd);
  renderCommands();
  selectCommand(cmd.uid);
  updateStats();
  toast('Command added: ' + cmd.name, 'success');
}

// ─── Render Commands ───
function renderCommands(filter = '') {
  let filtered = commands.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.fields.commandName.toLowerCase().includes(filter.toLowerCase())
  );
  if (activeCategoryFilter !== 'all') {
    filtered = filtered.filter(c => c.category === activeCategoryFilter);
  }

  if (filtered.length === 0 && commands.length === 0) {
    emptyStateEl.classList.remove('hidden');
    commandCardsEl.innerHTML = '';
    return;
  }

  emptyStateEl.classList.add('hidden');
  const prefix = $('#botPrefix').value || '!';

  commandCardsEl.innerHTML = filtered.map(cmd => `
    <div class="command-card ${cmd.uid === selectedCommandId ? 'active' : ''} ${!cmd.enabled ? 'disabled' : ''}" data-uid="${cmd.uid}">
      <div class="card-icon">${cmd.icon}</div>
      <div class="card-info">
        <div class="card-name">
          <span class="prefix-tag">${prefix}${cmd.fields.commandName}</span>
          ${cmd.name}
          <span class="card-category cat-${cmd.category}">${cmd.category}</span>
        </div>
        <div class="card-desc">${cmd.description}${cmd.fields.aliases ? ' · aliases: ' + cmd.fields.aliases : ''}</div>
      </div>
      <div class="card-actions" onclick="event.stopPropagation()">
        <label class="toggle-switch" title="${cmd.enabled ? 'Enabled' : 'Disabled'}">
          <input type="checkbox" ${cmd.enabled ? 'checked' : ''} data-toggle="${cmd.uid}" />
          <span class="toggle-slider"></span>
        </label>
        <button class="icon-btn" data-delete="${cmd.uid}" title="Delete">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Bind card events
  commandCardsEl.querySelectorAll('.command-card').forEach(card => {
    card.addEventListener('click', () => selectCommand(card.dataset.uid));
  });
  commandCardsEl.querySelectorAll('[data-toggle]').forEach(tog => {
    tog.addEventListener('change', (e) => {
      const cmd = commands.find(c => c.uid === e.target.dataset.toggle);
      if (cmd) { cmd.enabled = e.target.checked; renderCommands(searchInput.value); updateStats(); scheduleAutoSave(); }
    });
  });
  commandCardsEl.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteCommand(btn.dataset.delete);
    });
  });
}

// ─── Select Command ───
function selectCommand(uid) {
  selectedCommandId = uid;
  const cmd = commands.find(c => c.uid === uid);
  if (!cmd) return;

  renderCommands(searchInput.value);
  renderEditor(cmd);
  editorPanel.classList.remove('hidden');
}

// ─── Delete Command ───
function deleteCommand(uid) {
  const cmd = commands.find(c => c.uid === uid);
  commands = commands.filter(c => c.uid !== uid);
  if (selectedCommandId === uid) {
    selectedCommandId = null;
    editorPanel.classList.add('hidden');
  }
  renderCommands(searchInput.value);
  updateStats();
  scheduleAutoSave();
  if (cmd) toast('Deleted: ' + cmd.name, 'error');
}

// ─── Render Editor ───
function renderEditor(cmd) {
  editorTitle.textContent = `${cmd.icon} Edit: ${cmd.name}`;

  const fieldDefs = getFieldDefinitions(cmd);
  let html = '';

  fieldDefs.forEach(section => {
    html += `<div class="editor-section">`;
    html += `<div class="editor-section-title">${section.title}</div>`;
    section.fields.forEach(f => {
      html += renderField(f, cmd);
    });
    html += `</div>`;
  });

  // Variables help
  const vars = getVariables(cmd);
  if (vars.length > 0) {
    html += `<div class="editor-section">
      <div class="editor-section-title">Available Variables</div>
      <div class="var-list">${vars.map(v => `<span class="var-pill" title="Click to copy" data-var="${v}">${v}</span>`).join('')}</div>
      <div class="editor-field"><span class="help-text">Click a variable to copy it. Use these in your messages.</span></div>
    </div>`;
  }

  // Action buttons
  html += `<div class="editor-actions">
    <button class="btn btn-outline btn-sm" id="editorDuplicate">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      Duplicate
    </button>
    <button class="btn btn-danger btn-sm" id="editorDelete">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      Delete Command
    </button>
  </div>`;

  editorBody.innerHTML = html;

  // Bind editor inputs
  editorBody.querySelectorAll('[data-field]').forEach(input => {
    const fieldKey = input.dataset.field;
    const handler = () => {
      if (input.type === 'checkbox') {
        cmd.fields[fieldKey] = input.checked;
      } else {
        cmd.fields[fieldKey] = input.value;
      }
      // Update card in list if name changed
      if (fieldKey === 'commandName') {
        renderCommands(searchInput.value);
      }
      scheduleAutoSave();
    };
    input.addEventListener('input', handler);
    input.addEventListener('change', handler);
  });

  // Var pills
  editorBody.querySelectorAll('.var-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      navigator.clipboard.writeText(pill.dataset.var);
      toast('Copied: ' + pill.dataset.var, 'success');
    });
  });

  // Delete btn
  const delBtn = editorBody.querySelector('#editorDelete');
  if (delBtn) {
    delBtn.addEventListener('click', () => deleteCommand(cmd.uid));
  }

  // Duplicate btn
  const dupBtn = editorBody.querySelector('#editorDuplicate');
  if (dupBtn) {
    dupBtn.addEventListener('click', () => duplicateCommand());
  }
}

function renderField(f, cmd) {
  const val = cmd.fields[f.key];
  if (f.type === 'text') {
    return `<div class="editor-field">
      <label>${f.label}</label>
      <input type="text" data-field="${f.key}" value="${escHtml(val || '')}" placeholder="${f.placeholder || ''}" />
      ${f.help ? `<span class="help-text">${f.help}</span>` : ''}
    </div>`;
  }
  if (f.type === 'textarea') {
    return `<div class="editor-field">
      <label>${f.label}</label>
      <textarea data-field="${f.key}" placeholder="${f.placeholder || ''}" rows="${f.rows || 3}">${escHtml(val || '')}</textarea>
      ${f.help ? `<span class="help-text">${f.help}</span>` : ''}
    </div>`;
  }
  if (f.type === 'checkbox') {
    return `<div class="editor-field" style="flex-direction:row;align-items:center;gap:8px;">
      <label class="toggle-switch">
        <input type="checkbox" data-field="${f.key}" ${val ? 'checked' : ''} />
        <span class="toggle-slider"></span>
      </label>
      <label style="cursor:pointer">${f.label}</label>
    </div>`;
  }
  if (f.type === 'select') {
    return `<div class="editor-field">
      <label>${f.label}</label>
      <select data-field="${f.key}">
        ${f.options.map(o => `<option value="${o.value}" ${val === o.value ? 'selected' : ''}>${o.label}</option>`).join('')}
      </select>
    </div>`;
  }
  if (f.type === 'color') {
    return `<div class="editor-field" style="flex-direction:row;align-items:center;gap:10px;">
      <label>${f.label}</label>
      <input type="color" data-field="${f.key}" value="${val || '#ff7814'}" style="width:36px;height:28px;border:none;background:none;cursor:pointer;" />
      <input type="text" data-field="${f.key}" value="${val || '#ff7814'}" style="width:90px;" />
    </div>`;
  }
  return '';
}

// ─── Field Definitions per Template ───
function getFieldDefinitions(cmd) {
  const sections = [];

  // Basic
  const basic = [
    { key: 'commandName', label: 'Command Name', type: 'text', placeholder: 'e.g. kick', help: 'The word users type after the prefix' }
  ];
  if ('aliases' in cmd.fields) {
    basic.push({ key: 'aliases', label: 'Aliases', type: 'text', placeholder: 'alt1,alt2', help: 'Comma-separated alternative command names' });
  }
  if ('cooldown' in cmd.fields) {
    basic.push({ key: 'cooldown', label: 'Cooldown (seconds)', type: 'text', placeholder: '3', help: 'Seconds between uses per user' });
  }
  sections.push({ title: 'Basic', fields: basic });

  // Messages
  const messages = [];
  if ('response' in cmd.fields) {
    messages.push({ key: 'response', label: 'Success Message', type: 'textarea', placeholder: 'Message when command succeeds', rows: 3 });
  }
  if ('errorNoPerms' in cmd.fields) {
    messages.push({ key: 'errorNoPerms', label: 'No Permission Message', type: 'textarea', placeholder: 'When user lacks permission', rows: 2 });
  }
  if ('errorNoTarget' in cmd.fields) {
    messages.push({ key: 'errorNoTarget', label: 'No Target Message', type: 'textarea', placeholder: 'When no user is mentioned', rows: 2 });
  }
  if ('errorCantKick' in cmd.fields) {
    messages.push({ key: 'errorCantKick', label: 'Cannot Kick Message', type: 'textarea', rows: 2 });
  }
  if ('errorCantBan' in cmd.fields) {
    messages.push({ key: 'errorCantBan', label: 'Cannot Ban Message', type: 'textarea', rows: 2 });
  }
  if ('errorNoAmount' in cmd.fields) {
    messages.push({ key: 'errorNoAmount', label: 'No Amount Message', type: 'textarea', rows: 2 });
  }
  if ('errorNoMessage' in cmd.fields) {
    messages.push({ key: 'errorNoMessage', label: 'No Message Error', type: 'textarea', rows: 2 });
  }
  if ('dmMessage' in cmd.fields) {
    messages.push({ key: 'dmMessage', label: 'DM Message', type: 'textarea', placeholder: 'Message sent to target via DM', rows: 2 });
  }
  if ('message' in cmd.fields) {
    messages.push({ key: 'message', label: 'Message', type: 'textarea', rows: 3 });
  }
  if ('description' in cmd.fields) {
    messages.push({ key: 'description', label: 'Description', type: 'textarea', rows: 2 });
  }
  if ('title' in cmd.fields) {
    messages.push({ key: 'title', label: 'Title', type: 'text' });
  }
  if (messages.length) sections.push({ title: 'Messages', fields: messages });

  // Settings
  const settings = [];
  if ('requirePermission' in cmd.fields) {
    settings.push({
      key: 'requirePermission', label: 'Required Permission', type: 'select',
      options: [
        { value: '', label: 'None (everyone)' },
        { value: 'KickMembers', label: 'Kick Members' },
        { value: 'BanMembers', label: 'Ban Members' },
        { value: 'ManageMessages', label: 'Manage Messages' },
        { value: 'ManageRoles', label: 'Manage Roles' },
        { value: 'ManageChannels', label: 'Manage Channels' },
        { value: 'ManageNicknames', label: 'Manage Nicknames' },
        { value: 'ModerateMembers', label: 'Moderate Members' },
        { value: 'Administrator', label: 'Administrator' }
      ]
    });
  }
  if ('deleteCommand' in cmd.fields) {
    settings.push({ key: 'deleteCommand', label: 'Delete trigger message', type: 'checkbox' });
  }
  if ('sendDM' in cmd.fields) {
    settings.push({ key: 'sendDM', label: 'Send DM to target', type: 'checkbox' });
  }
  if ('successEmbed' in cmd.fields) {
    settings.push({ key: 'successEmbed', label: 'Use embed for response', type: 'checkbox' });
  }
  if ('useEmbed' in cmd.fields) {
    settings.push({ key: 'useEmbed', label: 'Use embed', type: 'checkbox' });
  }
  if ('autoDeleteResponse' in cmd.fields) {
    settings.push({ key: 'autoDeleteResponse', label: 'Auto-delete response', type: 'checkbox' });
  }
  if ('mentionEveryone' in cmd.fields) {
    settings.push({ key: 'mentionEveryone', label: 'Mention @everyone', type: 'checkbox' });
  }
  if ('showPrefix' in cmd.fields) {
    settings.push({ key: 'showPrefix', label: 'Show prefix in help', type: 'checkbox' });
  }
  if ('groupByCategory' in cmd.fields) {
    settings.push({ key: 'groupByCategory', label: 'Group by category', type: 'checkbox' });
  }
  if ('showAvatar' in cmd.fields) {
    settings.push({ key: 'showAvatar', label: 'Show avatar', type: 'checkbox' });
  }
  if ('showJoinDate' in cmd.fields) {
    settings.push({ key: 'showJoinDate', label: 'Show join date', type: 'checkbox' });
  }
  if ('showRoles' in cmd.fields) {
    settings.push({ key: 'showRoles', label: 'Show roles', type: 'checkbox' });
  }
  if ('showId' in cmd.fields) {
    settings.push({ key: 'showId', label: 'Show user ID', type: 'checkbox' });
  }
  if ('showMemberCount' in cmd.fields) {
    settings.push({ key: 'showMemberCount', label: 'Show member count', type: 'checkbox' });
  }
  if ('showChannelCount' in cmd.fields) {
    settings.push({ key: 'showChannelCount', label: 'Show channel count', type: 'checkbox' });
  }
  if ('showOwner' in cmd.fields) {
    settings.push({ key: 'showOwner', label: 'Show owner', type: 'checkbox' });
  }
  if ('showCreatedAt' in cmd.fields) {
    settings.push({ key: 'showCreatedAt', label: 'Show created date', type: 'checkbox' });
  }
  if ('showBadges' in cmd.fields) {
    settings.push({ key: 'showBadges', label: 'Show user badges', type: 'checkbox' });
  }
  if ('showBoosting' in cmd.fields) {
    settings.push({ key: 'showBoosting', label: 'Show boost status', type: 'checkbox' });
  }
  if (settings.length) sections.push({ title: 'Settings', fields: settings });

  // Extra config
  const extra = [];
  if ('defaultDuration' in cmd.fields) {
    extra.push({ key: 'defaultDuration', label: 'Default Duration', type: 'text', placeholder: '10m, 1h, 1d', help: 'Use formats like 10m, 1h, 1d' });
  }
  if ('deleteDays' in cmd.fields) {
    extra.push({ key: 'deleteDays', label: 'Delete Message History (days)', type: 'text', placeholder: '0-7' });
  }
  if ('maxMessages' in cmd.fields) {
    extra.push({ key: 'maxMessages', label: 'Max Messages to Clear', type: 'text', placeholder: '100' });
  }
  if ('autoDeleteDelay' in cmd.fields) {
    extra.push({ key: 'autoDeleteDelay', label: 'Auto-delete Delay (seconds)', type: 'text', placeholder: '5' });
  }
  if ('reportChannelId' in cmd.fields) {
    extra.push({ key: 'reportChannelId', label: 'Report Channel ID', type: 'text', placeholder: 'Staff channel for reports' });
  }
  if ('suggestChannelId' in cmd.fields) {
    extra.push({ key: 'suggestChannelId', label: 'Suggestion Channel ID', type: 'text', placeholder: 'Channel for suggestions' });
  }
  if ('triviaTimeout' in cmd.fields) {
    extra.push({ key: 'triviaTimeout', label: 'Answer Timeout (seconds)', type: 'text', placeholder: '15' });
  }
  if ('maxDisplay' in cmd.fields) {
    extra.push({ key: 'maxDisplay', label: 'Max Entries to Show', type: 'text', placeholder: '10' });
  }
  if ('milestoneInterval' in cmd.fields) {
    extra.push({ key: 'milestoneInterval', label: 'Milestone Interval', type: 'text', placeholder: '100', help: 'Every N members triggers the message' });
  }
  if ('channelId' in cmd.fields) {
    extra.push({ key: 'channelId', label: 'Channel ID', type: 'text', placeholder: 'Target channel ID' });
  }
  if ('targetChannel' in cmd.fields) {
    extra.push({ key: 'targetChannel', label: 'Announcement Channel ID', type: 'text', placeholder: 'Channel ID (optional)' });
  }
  if ('roleId' in cmd.fields) {
    extra.push({ key: 'roleId', label: 'Role ID', type: 'text', placeholder: 'Role ID to assign' });
  }
  if ('roleName' in cmd.fields) {
    extra.push({ key: 'roleName', label: 'Role Name', type: 'text', placeholder: 'For display purposes' });
  }
  if ('embedColor' in cmd.fields) {
    extra.push({ key: 'embedColor', label: 'Embed Color', type: 'text', placeholder: '#ff7814' });
  }
  if ('ticketCategory' in cmd.fields) {
    extra.push({ key: 'ticketCategory', label: 'Ticket Category ID', type: 'text', placeholder: 'Category ID for ticket channels' });
  }
  if ('staffRoleId' in cmd.fields) {
    extra.push({ key: 'staffRoleId', label: 'Staff Role ID', type: 'text', placeholder: 'Role that can see tickets' });
  }
  if ('duration' in cmd.fields) {
    extra.push({ key: 'duration', label: 'Duration', type: 'text', placeholder: '1h, 1d', help: 'Giveaway duration' });
  }
  if ('embedTitle' in cmd.fields) {
    extra.push({ key: 'embedTitle', label: 'Embed Title', type: 'text', placeholder: 'Title' });
  }
  if ('embedDesc' in cmd.fields) {
    extra.push({ key: 'embedDesc', label: 'Embed Description', type: 'textarea', rows: 3, placeholder: 'Content...' });
  }
  if ('embedThumb' in cmd.fields) {
    extra.push({ key: 'embedThumb', label: 'Thumbnail URL', type: 'text', placeholder: 'https://...' });
  }
  if ('embedImage' in cmd.fields) {
    extra.push({ key: 'embedImage', label: 'Image URL', type: 'text', placeholder: 'https://...' });
  }
  if ('embedFooter' in cmd.fields) {
    extra.push({ key: 'embedFooter', label: 'Footer', type: 'text', placeholder: 'Footer text' });
  }
  if (extra.length) sections.push({ title: 'Configuration', fields: extra });

  return sections;
}

// ─── Variables per template ───
function getVariables(cmd) {
  const base = ['{author}', '{server}'];
  const cat = cmd.category;
  if (cat === 'moderation') return [...base, '{target}', '{reason}', '{duration}', '{count}', '{role}'];
  if (cat === 'events') return [...base, '{mention}', '{user}', '{count}', '{role}'];
  if (cat === 'info') return [...base, '{target}'];
  if (cat === 'fun') return [...base, '{args}'];
  if (cat === 'custom') return [...base, '{target}', '{args}'];
  return [...base, '{args}'];
}

// ─── Stats ───
function updateStats() {
  $('#totalCommands').textContent = commands.length;
  $('#activeCommands').textContent = commands.filter(c => c.enabled).length;
  const modEl = $('#modCommands');
  const funEl = $('#funCommands');
  if (modEl) modEl.textContent = commands.filter(c => c.category === 'moderation').length;
  if (funEl) funEl.textContent = commands.filter(c => c.category === 'fun').length;
  // Utility + Info + Events stats
  const utilEl = $('#utilCommands');
  const infoEl = $('#infoCommands');
  const eventEl = $('#eventCommands');
  if (utilEl) utilEl.textContent = commands.filter(c => c.category === 'utility').length;
  if (infoEl) infoEl.textContent = commands.filter(c => c.category === 'info').length;
  if (eventEl) eventEl.textContent = commands.filter(c => c.category === 'events').length;
  updateDashboardExtras();
}

// ─── Global Events ───
function bindGlobalEvents() {
  // Title bar buttons
  $('#tbMin').addEventListener('click', () => window.pyix.minimize());
  $('#tbMax').addEventListener('click', () => window.pyix.maximize());
  $('#tbClose').addEventListener('click', () => window.pyix.close());

  // Close editor
  $('#closeEditor').addEventListener('click', () => {
    editorPanel.classList.add('hidden');
    selectedCommandId = null;
    renderCommands(searchInput.value);
  });

  // Search
  searchInput.addEventListener('input', () => renderCommands(searchInput.value));

  // Toggle token visibility
  $('#toggleToken').addEventListener('click', () => {
    const inp = $('#botToken');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });

  // Export + Actions
  $('#exportBtn').addEventListener('click', exportBot);
  $('#saveConfigBtn').addEventListener('click', saveConfig);
  $('#loadConfigBtn').addEventListener('click', loadConfig);

  // Duplicate button
  const dupBtn = $('#duplicateCmd');
  if (dupBtn) dupBtn.addEventListener('click', duplicateCommand);

  // Dashboard quick actions
  const dashExport = $('#dashExport');
  if (dashExport) dashExport.addEventListener('click', exportBot);
  const dashPreview = $('#dashPreview');
  if (dashPreview) dashPreview.addEventListener('click', () => showCodeModal());
  const dashSave = $('#dashSave');
  if (dashSave) dashSave.addEventListener('click', saveConfig);
  const dashLoad = $('#dashLoad');
  if (dashLoad) dashLoad.addEventListener('click', loadConfig);

  // Clear all commands
  const clearAllBtn = $('#clearAllBtn');
  if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllCommands);

  // Run / Stop bot
  bindRunBot();
}

// ─── Run / Stop Bot ───
let botRunning = false;
function bindRunBot() {
  const btn = $('#runBotBtn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    if (botRunning) {
      setBotRunning(false);
      const res = await window.pyix.stopBot();
      if (res.success) {
        toast('Bot stopped', 'info');
      } else {
        toast(res.error || 'Failed to stop bot', 'error');
      }
    } else {
      const code = generateBotCode();
      if (!code) { toast('No code to run', 'error'); return; }
      const token = $('#botToken').value;
      if (!token || token === 'YOUR_BOT_TOKEN_HERE') {
        toast('Please set your bot token in Settings first', 'error');
        return;
      }
      const res = await window.pyix.startBot(code);
      if (res.success) {
        setBotRunning(true);
        toast('Bot started!', 'success');
      } else {
        toast(res.error || 'Failed to start bot', 'error');
      }
    }
  });

  let lastBotError = '';
  window.pyix.onBotLog((msg) => {
    console.log('[BOT]', msg);
    if (msg.startsWith('[ERROR]')) {
      lastBotError = msg.replace('[ERROR] ', '').trim();
      toast(lastBotError.slice(0, 200), 'error');
    } else {
      toast(msg.trim().slice(0, 120), 'success');
    }
    const logEl = $('#botConsole');
    if (logEl) {
      logEl.textContent += msg;
      logEl.scrollTop = logEl.scrollHeight;
    }
  });

  window.pyix.onBotStopped((exitCode) => {
    setBotRunning(false);
    if (exitCode && lastBotError) {
      toast('Bot crashed: ' + lastBotError.slice(0, 150), 'error');
    } else {
      toast('Bot stopped' + (exitCode ? ` (exit code: ${exitCode})` : ''), 'info');
    }
    lastBotError = '';
  });
}

function setBotRunning(running) {
  botRunning = running;
  const btn = $('#runBotBtn');
  if (!btn) return;
  if (running) {
    btn.classList.add('running');
    btn.title = 'Stop Bot';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="6" width="12" height="12" rx="2"/></svg><span class="nav-label">Stop</span>`;
  } else {
    btn.classList.remove('running');
    btn.title = 'Start Bot';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg><span class="nav-label">Run</span>`;
  }
}

// ─── Export Bot Code ───
function generateBotCode() {
  const botName = $('#botName').value || 'MyBot';
  const prefix = $('#botPrefix').value || '!';
  const token = $('#botToken').value || 'YOUR_BOT_TOKEN_HERE';
  const status = $('#botStatus').value;
  const activity = $('#botActivity').value || 'with Pyix';
  const activityType = $('#botActivityType')?.value || '0';
  const commandType = $('#commandType')?.value || 'prefix';
  const useSlash = commandType === 'slash' || commandType === 'both';
  const usePrefix = commandType === 'prefix' || commandType === 'both';
  const enabledCmds = commands.filter(c => c.enabled);
  const hasMute = enabledCmds.some(c => c.templateId === 'mute');
  const hasReminder = enabledCmds.some(c => c.templateId === 'reminder');
  const hasSnipe = enabledCmds.some(c => c.templateId === 'snipe');
  const hasAfk = enabledCmds.some(c => c.templateId === 'afk');
  const hasTicket = enabledCmds.some(c => c.templateId === 'ticket');
  const hasCooldown = enabledCmds.some(c => parseInt(c.fields.cooldown) > 0);
  const hasAliases = enabledCmds.some(c => c.fields.aliases && c.fields.aliases.trim());
  const messageCmds = enabledCmds.filter(c => c.category !== 'events');

  let code = `// ═══════════════════════════════════════════════════
// ${botName} — Generated by Pyix Bot Builder
// ═══════════════════════════════════════════════════
const { Client, GatewayIntentBits, EmbedBuilder, PermissionFlagsBits, PermissionsBitField, ChannelType${useSlash ? ', SlashCommandBuilder' : ''} } = require('discord.js');
${useSlash ? `const { REST, Routes } = require('discord.js');` : ''}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions
  ]
});

${usePrefix ? `const PREFIX = '${prefix}';` : '// Slash commands only — no prefix needed'}
const warnings = new Map();
`;

  const hasTempban = enabledCmds.some(c => c.templateId === 'tempban');
  if (hasMute || hasReminder || hasTempban) {
    code += `\nfunction parseDuration(str) {
  const match = str.match(/^(\\d+)(s|m|h|d)$/);
  if (!match) return null;
  const num = parseInt(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
  return num * multipliers[unit];
}\n`;
  }
  if (hasSnipe) code += `\nconst snipes = new Map();\n`;
  if (enabledCmds.some(c => c.templateId === 'snipeedit')) code += `const editSnipes = new Map();\n`;
  if (hasAfk) code += `\nconst afkUsers = new Map();\n`;
  if (enabledCmds.some(c => ['balance','work','daily','leaderboard-eco'].includes(c.templateId))) code += `const economy = new Map();\nconst dailyCooldowns = new Map();\n`;
  if (enabledCmds.some(c => ['marry','divorce'].includes(c.templateId))) code += `const marriages = new Map();\n`;
  if (enabledCmds.some(c => c.templateId === 'modnote')) code += `const modNotes = new Map();\n`;
  if (hasCooldown) code += `\nconst cooldowns = new Map();\n`;
  if (hasAliases) {
    code += `\nconst aliases = new Map();\n`;
    enabledCmds.filter(c => c.fields.aliases && c.fields.aliases.trim() && c.category !== 'events').forEach(c => {
      c.fields.aliases.split(',').map(a => a.trim()).filter(Boolean).forEach(a => {
        code += `aliases.set('${a}', '${c.fields.commandName}');\n`;
      });
    });
  }

  // Auto-mod config
  const automod = getAutoModConfig();
  if (automod.enabled) {
    code += `\n// Auto-mod config
const autoModConfig = ${JSON.stringify(automod, null, 2)};\n`;
  }

  if (useSlash) {
    code += generateSlashRegistration(messageCmds, token);
  }

  code += `\nclient.once('ready', async (readyClient) => {
  console.log(\`✅ \${client.user.tag} is online!\`);
  client.user.setPresence({
    status: '${status}',
    activities: [{ name: '${activity}', type: ${activityType} }]
  });\n`;
  if (useSlash) {
    code += `  // Register slash commands on ready
  try {
    const rest = new REST({ version: '10' }).setToken('${token}');
    await rest.put(Routes.applicationCommands(client.user.id), { body: slashCommands });
    console.log(\`✅ Registered \${slashCommands.length} slash commands!\`);
  } catch (e) { console.error('Slash registration error:', e); }\n`;
  }
  code += `});\n\n`;

  // Snipe listener
  if (hasSnipe) {
    code += `client.on('messageDelete', (message) => {
  if (message.author?.bot) return;
  snipes.set(message.channel.id, {
    content: message.content, author: message.author.tag,
    avatar: message.author.displayAvatarURL(), timestamp: Date.now()
  });
});\n\n`;
  }

  // Welcome event
  const welcomeCmd = enabledCmds.find(c => c.templateId === 'welcome');
  if (welcomeCmd) {
    const f = welcomeCmd.fields;
    code += `client.on('guildMemberAdd', async (member) => {
  try {
    const channel = member.guild.channels.cache.get('${f.channelId}');
    const msg = \`${f.message}\`.replace(/{server}/g, member.guild.name).replace(/{mention}/g, member.toString()).replace(/{count}/g, member.guild.memberCount);
    ${f.useEmbed ? `const embed = new EmbedBuilder().setDescription(msg).setColor('${f.embedColor || '#ff7814'}')${f.showAvatar ? `.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))` : ''};
    if (channel) channel.send({ embeds: [embed] });` : `if (channel) channel.send(msg);`}
    ${f.sendDM ? `try { await member.send(\`${f.dmMessage}\`.replace(/{server}/g, member.guild.name)); } catch(e) {}` : ''}
  } catch(e) { console.error('Welcome error:', e); }
});\n\n`;
  }

  // Autorole
  const autoroleCmd = enabledCmds.find(c => c.templateId === 'autorole');
  if (autoroleCmd) {
    code += `client.on('guildMemberAdd', async (member) => {
  try {
    const role = member.guild.roles.cache.get('${autoroleCmd.fields.roleId}');
    if (role) await member.roles.add(role);
  } catch(e) { console.error('Autorole error:', e); }
});\n\n`;
  }

  // Leave event
  const leaveCmd = enabledCmds.find(c => c.templateId === 'leave');
  if (leaveCmd) {
    const f = leaveCmd.fields;
    code += `client.on('guildMemberRemove', async (member) => {
  try {
    const channel = member.guild.channels.cache.get('${f.channelId}');
    if (!channel) return;
    const msg = \`${f.message}\`.replace(/{user}/g, member.user.tag).replace(/{server}/g, member.guild.name).replace(/{count}/g, member.guild.memberCount);
    ${f.useEmbed ? `const embed = new EmbedBuilder().setDescription(msg).setColor('${f.embedColor || '#ff7814'}').setThumbnail(member.user.displayAvatarURL({ dynamic: true })).setTimestamp();
    channel.send({ embeds: [embed] });` : `channel.send(msg);`}
  } catch(e) { console.error('Leave msg error:', e); }
});\n\n`;
  }

  // Boost event
  const boostCmd = enabledCmds.find(c => c.templateId === 'boost');
  if (boostCmd) {
    const f = boostCmd.fields;
    code += `client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if (!oldMember.premiumSince && newMember.premiumSince) {
    try {
      const channel = newMember.guild.channels.cache.get('${f.channelId}');
      if (!channel) return;
      const msg = \`${f.message}\`.replace(/{user}/g, newMember.user.tag).replace(/{server}/g, newMember.guild.name).replace(/{count}/g, newMember.guild.premiumSubscriptionCount);
      ${f.useEmbed ? `const embed = new EmbedBuilder().setDescription(msg).setColor('${f.embedColor || '#f47fff'}').setThumbnail(newMember.user.displayAvatarURL({ dynamic: true })).setTimestamp();
      channel.send({ embeds: [embed] });` : `channel.send(msg);`}
    } catch(e) { console.error('Boost notif error:', e); }
  }
});\n\n`;
  }

  // Edit snipe listener
  if (enabledCmds.some(c => c.templateId === 'snipeedit')) {
    code += `client.on('messageUpdate', (oldMsg, newMsg) => {
  if (oldMsg.author?.bot || oldMsg.content === newMsg.content) return;
  editSnipes.set(oldMsg.channel.id, {
    oldContent: oldMsg.content, newContent: newMsg.content,
    author: oldMsg.author.tag, avatar: oldMsg.author.displayAvatarURL(), timestamp: Date.now()
  });
});\n\n`;
  }

  // Member milestone
  const milestoneCmd = enabledCmds.find(c => c.templateId === 'membermilestone');
  if (milestoneCmd) {
    const f = milestoneCmd.fields;
    code += `client.on('guildMemberAdd', (member) => {
  const count = member.guild.memberCount;
  if (count % ${f.milestoneInterval || 100} === 0) {
    const channel = member.guild.channels.cache.get('${f.channelId}');
    if (!channel) return;
    const msg = \`${f.message}\`.replace(/{count}/g, count).replace(/{server}/g, member.guild.name);
    ${f.useEmbed ? `const embed = new EmbedBuilder().setDescription(msg).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    channel.send({ embeds: [embed] });` : `channel.send(msg);`}
  }
});\n\n`;
  }

  // Voice log
  const voiceLogCmd = enabledCmds.find(c => c.templateId === 'voicelog');
  if (voiceLogCmd) {
    code += `client.on('voiceStateUpdate', (oldState, newState) => {
  const logCh = newState.guild.channels.cache.get('${voiceLogCmd.fields.channelId}');
  if (!logCh) return;
  if (!oldState.channel && newState.channel) {
    logCh.send({ embeds: [new EmbedBuilder().setDescription(\`🎙️ \${newState.member.user.tag} joined **\${newState.channel.name}**\`).setColor('#22c55e').setTimestamp()] });
  } else if (oldState.channel && !newState.channel) {
    logCh.send({ embeds: [new EmbedBuilder().setDescription(\`🎙️ \${oldState.member.user.tag} left **\${oldState.channel.name}**\`).setColor('#ef4444').setTimestamp()] });
  }
});\n\n`;
  }

  // Ban announce
  const banAnnCmd = enabledCmds.find(c => c.templateId === 'banannounce');
  if (banAnnCmd) {
    const f = banAnnCmd.fields;
    code += `client.on('guildBanAdd', (ban) => {
  const channel = ban.guild.channels.cache.get('${f.channelId}');
  if (!channel) return;
  const msg = \`${f.message}\`.replace(/{user}/g, ban.user.tag).replace(/{server}/g, ban.guild.name);
  ${f.useEmbed ? `channel.send({ embeds: [new EmbedBuilder().setDescription(msg).setColor('${f.embedColor || '#ef4444'}').setTimestamp()] });` : `channel.send(msg);`}
});\n\n`;
  }

  // Channel create/delete log
  const chCreateCmd = enabledCmds.find(c => c.templateId === 'channelcreate');
  if (chCreateCmd) {
    code += `client.on('channelCreate', (channel) => {
  if (!channel.guild) return;
  const logCh = channel.guild.channels.cache.get('${chCreateCmd.fields.channelId}');
  if (logCh) logCh.send({ embeds: [new EmbedBuilder().setDescription(\`📝 Channel created: **\${channel.name}**\`).setColor('${chCreateCmd.fields.embedColor || '#22c55e'}').setTimestamp()] });
});\n\n`;
  }
  const chDeleteCmd = enabledCmds.find(c => c.templateId === 'channeldelete');
  if (chDeleteCmd) {
    code += `client.on('channelDelete', (channel) => {
  if (!channel.guild) return;
  const logCh = channel.guild.channels.cache.get('${chDeleteCmd.fields.channelId}');
  if (logCh) logCh.send({ embeds: [new EmbedBuilder().setDescription(\`🗑️ Channel deleted: **\${channel.name}**\`).setColor('${chDeleteCmd.fields.embedColor || '#ef4444'}').setTimestamp()] });
});\n\n`;
  }

  // Role create/delete log
  const roleCreateCmd = enabledCmds.find(c => c.templateId === 'rolecreate');
  if (roleCreateCmd) {
    code += `client.on('roleCreate', (role) => {
  const logCh = role.guild.channels.cache.get('${roleCreateCmd.fields.channelId}');
  if (logCh) logCh.send({ embeds: [new EmbedBuilder().setDescription(\`🏷️ Role created: **\${role.name}**\`).setColor('${roleCreateCmd.fields.embedColor || '#3b82f6'}').setTimestamp()] });
});\n\n`;
  }
  const roleDeleteCmd = enabledCmds.find(c => c.templateId === 'roledelete');
  if (roleDeleteCmd) {
    code += `client.on('roleDelete', (role) => {
  const logCh = role.guild.channels.cache.get('${roleDeleteCmd.fields.channelId}');
  if (logCh) logCh.send({ embeds: [new EmbedBuilder().setDescription(\`🏷️ Role deleted: **\${role.name}**\`).setColor('${roleDeleteCmd.fields.embedColor || '#ef4444'}').setTimestamp()] });
});\n\n`;
  }

  // Auto-responses
  const autoResponses = getAutoResponses();
  if (autoResponses.length > 0) {
    code += `// ── Auto-Responses ──\nconst autoResponses = ${JSON.stringify(autoResponses)};\n\n`;
  }

  // ── Slash Command Handler ──
  if (useSlash) {
    code += generateSlashHandler(messageCmds, hasCooldown, prefix);
  }

  if (!usePrefix) {
    // Skip prefix handler entirely
  } else {
  // Prefix command handler
  code += `client.on('messageCreate', async (message) => {
  if (message.author.bot) return;\n`;

  // Auto-mod block
  if (automod.enabled) {
    code += `\n  // ── Auto-Mod ──
  if (!message.member?.permissions.has(PermissionFlagsBits.ManageMessages)) {
    ${automod.exemptRole ? `if (!message.member?.roles.cache.has('${automod.exemptRole}')) {` : '{'}
    let violation = null;
    ${automod.antiLinks ? `if (/(https?:\\/\\/[^\\s]+)/gi.test(message.content)) violation = 'link detected';` : ''}
    ${automod.antiInvites ? `if (/(discord\\.gg|discord\\.com\\/invite)/gi.test(message.content)) violation = 'invite link detected';` : ''}
    ${automod.antiCaps ? `if (message.content.length > 10 && (message.content.replace(/[^A-Z]/g, '').length / message.content.replace(/[^a-zA-Z]/g, '').length) > 0.7) violation = 'excessive caps';` : ''}
    ${automod.massMention ? `if (message.mentions.users.size > 5) violation = 'mass mention';` : ''}
    ${automod.badWords && automod.badWordsList.length ? `const badWords = ${JSON.stringify(automod.badWordsList)};
    if (badWords.some(w => message.content.toLowerCase().includes(w.toLowerCase()))) violation = 'blocked word';` : ''}
    if (violation) {
      try { await message.delete(); } catch(e) {}
      ${automod.action === 'warn' ? `message.channel.send(\`⚠️ \${message.author}, your message was removed: \${violation}\`);` : ''}
      ${automod.action === 'mute' ? `try { await message.member.timeout(300000, violation); } catch(e) {}
      message.channel.send(\`⚠️ \${message.author} has been timed out: \${violation}\`);` : ''}
      ${automod.action === 'kick' ? `try { await message.member.kick(violation); } catch(e) {}` : ''}
      ${automod.logChannel ? `const logCh = message.guild.channels.cache.get('${automod.logChannel}');
      if (logCh) logCh.send(\`🛡️ Auto-mod | \${message.author.tag} | \${violation}\`);` : ''}
      return;
    }
    ${automod.exemptRole ? '}' : '}'}
  }\n`;
  }

  // AFK check
  if (hasAfk) {
    code += `\n  // AFK check
  if (afkUsers.has(message.author.id)) {
    afkUsers.delete(message.author.id);
    message.reply('Welcome back! Your AFK status has been removed.').then(m => setTimeout(() => m.delete().catch(() => {}), 5000));
  }
  message.mentions.users.forEach(u => {
    if (afkUsers.has(u.id)) message.reply(\`💤 \${u.tag} is AFK: \${afkUsers.get(u.id)}\`);
  });\n`;
  }

  // Auto-responses check
  if (autoResponses.length > 0) {
    code += `\n  // Auto-responses
  for (const ar of autoResponses) {
    const match = ar.exact ? message.content.toLowerCase() === ar.trigger.toLowerCase() : message.content.toLowerCase().includes(ar.trigger.toLowerCase());
    if (match) { message.channel.send(ar.response.replace(/{author}/g, message.author.tag).replace(/{server}/g, message.guild.name)); break; }
  }\n`;
  }

  code += `\n  if (!message.content.startsWith(PREFIX)) return;
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  let commandName = args.shift().toLowerCase();\n`;

  if (hasAliases) code += `  commandName = aliases.get(commandName) || commandName;\n`;

  if (hasCooldown) {
    code += `\n  // Cooldown check
  const cdKey = \`\${commandName}-\${message.author.id}\`;
  if (cooldowns.has(cdKey)) {
    const remaining = ((cooldowns.get(cdKey) - Date.now()) / 1000).toFixed(1);
    if (remaining > 0) return message.reply(\`⏳ Please wait \${remaining}s before using this command again.\`);
  }\n`;
  }

  code += `\n`;
  messageCmds.forEach((cmd, i) => {
    const f = cmd.fields;
    const ifWord = i === 0 ? 'if' : 'else if';
    code += `  ${ifWord} (commandName === '${f.commandName}') {\n`;
    if (f.requirePermission) {
      code += `    if (!message.member.permissions.has(PermissionFlagsBits.${f.requirePermission})) return message.reply(\`${f.errorNoPerms || '❌ No permission.'}\`);\n`;
    }
    if (f.deleteCommand) code += `    try { await message.delete(); } catch(e) {}\n`;
    if (hasCooldown && parseInt(f.cooldown) > 0) {
      code += `    cooldowns.set(cdKey, Date.now() + ${parseInt(f.cooldown) * 1000});
    setTimeout(() => cooldowns.delete(cdKey), ${parseInt(f.cooldown) * 1000});\n`;
    }

    switch (cmd.templateId) {
      case 'kick': code += generateKickCode(f); break;
      case 'ban': code += generateBanCode(f); break;
      case 'mute': code += generateMuteCode(f); break;
      case 'unmute': code += generateUnmuteCode(f); break;
      case 'warn': code += generateWarnCode(f); break;
      case 'clear': code += generateClearCode(f); break;
      case 'userinfo': code += generateUserInfoCode(f); break;
      case 'serverinfo': code += generateServerInfoCode(f); break;
      case 'help': code += generateHelpCode(f, prefix, messageCmds); break;
      case 'ping': code += generatePingCode(f); break;
      case 'say': code += generateSayCode(f); break;
      case 'announce': code += generateAnnounceCode(f); break;
      case 'poll': code += generatePollCode(f); break;
      case 'giveaway': code += generateGiveawayCode(f); break;
      case 'ticket': code += generateTicketCode(f); break;
      case 'avatar': code += generateAvatarCode(f); break;
      case 'slowmode': code += generateSlowmodeCode(f); break;
      case 'lock': code += generateLockCode(f); break;
      case 'unlock': code += generateUnlockCode(f); break;
      case 'unban': code += generateUnbanCode(f); break;
      case 'snipe': code += generateSnipeCode(f); break;
      case '8ball': code += generate8BallCode(f); break;
      case 'coinflip': code += generateCoinflipCode(f); break;
      case 'roll': code += generateRollCode(f); break;
      case 'afk': code += generateAfkCode(f); break;
      case 'roleinfo': code += generateRoleInfoCode(f); break;
      case 'nickname': code += generateNicknameCode(f); break;
      case 'embedcmd': code += generateEmbedCmdCode(f); break;
      case 'report': code += generateReportCode(f); break;
      case 'suggest': code += generateSuggestCode(f); break;
      case 'rps': code += generateRpsCode(f); break;
      case 'trivia': code += generateTriviaCode(f); break;
      case 'addrole': code += generateAddRoleCode(f); break;
      case 'removerole': code += generateRemoveRoleCode(f); break;
      case 'reminder': code += generateReminderCode(f); break;
      case 'banner': code += generateBannerCode(f); break;
      case 'whois': code += generateWhoisCode(f); break;
      case 'channelinfo': code += generateChannelInfoCode(f); break;
      case 'leaderboard': code += generateLeaderboardCode(f); break;
      // ─── Moderation batch 2 ───
      case 'softban': code += generateSoftbanCode(f); break;
      case 'nuke': code += generateNukeCode(f); break;
      case 'voicekick': code += generateVoiceActionCode(f, 'disconnect'); break;
      case 'voicemute': code += generateVoiceActionCode(f, 'mute'); break;
      case 'voicedeafen': code += generateVoiceActionCode(f, 'deafen'); break;
      case 'clearwarns': code += generateClearWarnsCode(f); break;
      case 'warncount': code += generateWarnCountCode(f); break;
      case 'jail': case 'unjail': code += generateJailCode(f, cmd.templateId); break;
      case 'tempban': code += generateTempbanCode(f); break;
      case 'hide': code += generateHideCode(f, false); break;
      case 'unhide': code += generateHideCode(f, true); break;
      case 'dehoist': code += generateDehoistCode(f); break;
      case 'modnote': code += generateModNoteCode(f); break;
      case 'massrole': code += generateMassRoleCode(f); break;
      // ─── Utility batch 2 ───
      case 'calc': code += generateCalcCode(f); break;
      case 'choose': code += generateChooseCode(f); break;
      case 'rate': code += generateRateCode(f); break;
      case 'uptime': code += generateUptimeCode(f); break;
      case 'invitebot': code += generateInviteBotCode(f); break;
      case 'botinfo': code += generateBotInfoCode(f); break;
      case 'membercount': code += generateMemberCountCode(f); break;
      case 'reverse': code += generateTextTransformCode(f, 'reverse'); break;
      case 'binary': code += generateTextTransformCode(f, 'binary'); break;
      case 'hex': code += generateTextTransformCode(f, 'hex'); break;
      case 'base64': code += generateTextTransformCode(f, 'base64'); break;
      case 'enlarge': code += generateEnlargeCode(f); break;
      case 'servericon': code += generateServerIconCode(f); break;
      case 'rolecount': code += generateSimpleInfoCode(f, 'rolecount'); break;
      case 'channelcount': code += generateSimpleInfoCode(f, 'channelcount'); break;
      case 'firstmsg': code += generateFirstMsgCode(f); break;
      case 'timestamp': code += generateTimestampCode(f); break;
      case 'colorinfo': code += generateColorInfoCode(f); break;
      case 'countdown': code += generateCountdownCode(f); break;
      case 'embedsay': code += generateEmbedSayCode(f); break;
      case 'snipeedit': code += generateEditSnipeCode(f); break;
      case 'steal': code += generateStealCode(f); break;
      case 'afklist': code += generateAfkListCode(f); break;
      case 'remindlist': code += generateRemindListCode(f); break;
      case 'nickname-self': code += generateSelfNickCode(f); break;
      // ─── Fun batch 2 ───
      case 'joke': case 'fact': case 'quote': case 'fortune': case 'pickup': case 'dare': case 'truth': case 'paranoia': case 'neverhavei': case 'wyr': case 'tod': case 'meme': case 'roast': case 'compliment':
        code += generateRandomPoolCode(f, cmd.templateId); break;
      case 'ship': code += generateShipCode(f); break;
      case 'hug': case 'slap': case 'pat': case 'kiss': case 'poke': case 'bite': case 'highfive':
        code += generateSocialActionCode(f, cmd.templateId); break;
      case 'wink': case 'dab': case 'cry': case 'laugh': case 'facepalm':
        code += generateEmoteCode(f, cmd.templateId); break;
      case 'tableflip': code += `    message.channel.send('(╯°□°)╯︵ ┻━┻');\n`; break;
      case 'unflip': code += `    message.channel.send('┬─┬ ノ( ゜-゜ノ)');\n`; break;
      case 'numberguess': code += generateNumberGuessCode(f); break;
      case 'slots': code += generateSlotsCode(f); break;
      case 'gayrate': case 'simprate': case 'iqtest': case 'howcute':
        code += generatePercentRateCode(f, cmd.templateId); break;
      case 'mock': code += generateMockCode(f); break;
      case 'uwuify': code += generateUwuCode(f); break;
      case 'ascii': code += generateAsciiCode(f); break;
      case 'emojify': code += generateEmojifyCode(f); break;
      case 'clap': code += generateClapCode(f); break;
      case 'pp': code += generatePPCode(f); break;
      case 'fight': code += generateFightCode(f); break;
      case 'marry': case 'divorce': code += generateMarryCode(f, cmd.templateId); break;
      // ─── Info batch 2 ───
      case 'emojilist': code += generateEmojiListCode(f); break;
      case 'boosters': code += generateBoostersCode(f); break;
      case 'perms': code += generatePermsCode(f); break;
      case 'whohas': code += generateWhoHasCode(f); break;
      case 'roles': code += generateRolesListCode(f); break;
      case 'emotecount': code += generateSimpleInfoCode(f, 'emotecount'); break;
      case 'oldestmember': code += generateMemberSortCode(f, 'oldest'); break;
      case 'newestmember': code += generateMemberSortCode(f, 'newest'); break;
      case 'banlist': code += generateBanListCode(f); break;
      case 'invites': code += generateInvitesCode(f); break;
      case 'botstatus': code += generateBotStatusCode(f); break;
      // ─── Economy/Custom batch 2 ───
      case 'balance': code += generateBalanceCode(f); break;
      case 'work': code += generateWorkCode(f); break;
      case 'daily': code += generateDailyCode(f); break;
      case 'leaderboard-eco': code += generateEcoLeaderboardCode(f); break;
      case 'selfrole': code += generateSelfRoleCode(f); break;
      case 'colorrole': code += generateColorRoleCode(f); break;
      case 'apply': code += generateApplyCode(f); break;
      default: code += generateCustomCode(f);
    }
    // Inject logic blocks if any
    const logicCode = generateLogicCode(cmd);
    if (logicCode) code += logicCode;
    code += `  }\n`;
  });

  code += `});\n\n`;
  } // end usePrefix

  // Logging listeners
  const loggingCode = generateLoggingCode();
  if (loggingCode) code += loggingCode + '\n';

  code += `client.login('${token}');\n\n`;
  code += `// Graceful shutdown — watches for stop signal file
const __fs = require('fs');
const __path = require('path');
const __stopFile = __path.join(__dirname, '_pyix_stop');
setInterval(() => {
  if (__fs.existsSync(__stopFile)) {
    try { __fs.unlinkSync(__stopFile); } catch(e) {}
    console.log('🛑 Shutting down...');
    client.destroy();
    setTimeout(() => process.exit(0), 500);
  }
}, 300);\n`;
  return code;
}

async function exportBot() {
  const enabledCmds = commands.filter(c => c.enabled);
  if (enabledCmds.length === 0) { toast('Add at least one command before exporting.', 'error'); return; }
  const code = generateBotCode();
  const result = await window.pyix.exportBot(code);
  if (result.success) toast('Bot exported to ' + result.path, 'success');
}

// ─── Code Generators ───
function generateKickCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!target.kickable) return message.channel.send(\`${f.errorCantKick}\`);
    const reason = args.slice(1).join(' ') || 'No reason provided';
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, message.guild.name).replace(/{author}/g, message.author.tag).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    await target.kick(reason);
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, message.author.tag).replace(/{reason}/g, reason);
    ${sendReply}
    ${f.logChannel ? `const logCh = message.guild.channels.cache.get('${f.logChannel}'); if (logCh) logCh.send(\`📋 Kick | \${target.user.tag} by \${message.author.tag} | \${reason}\`);` : ''}\n`;
}

function generateBanCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!target.bannable) return message.channel.send(\`${f.errorCantBan}\`);
    const reason = args.slice(1).join(' ') || 'No reason provided';
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, message.guild.name).replace(/{author}/g, message.author.tag).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    await target.ban({ deleteMessageDays: ${f.deleteDays || 0}, reason });
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, message.author.tag).replace(/{reason}/g, reason);
    ${sendReply}\n`;
}

function generateMuteCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const durationStr = args[1] || '${f.defaultDuration || '10m'}';
    const reason = args.slice(2).join(' ') || 'No reason provided';
    const ms = parseDuration(durationStr);
    if (!ms) return message.channel.send('❌ Invalid duration. Use formats like 10m, 1h, 1d');
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, message.guild.name).replace(/{author}/g, message.author.tag).replace(/{duration}/g, durationStr).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    await target.timeout(ms, reason);
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, message.author.tag).replace(/{duration}/g, durationStr).replace(/{reason}/g, reason);
    ${sendReply}\n`;
}

function generateUnmuteCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    await target.timeout(null);
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag);
    ${sendReply}\n`;
}

function generateWarnCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const reason = args.slice(1).join(' ') || 'No reason provided';
    const key = \`\${message.guild.id}-\${target.id}\`;
    const userWarns = warnings.get(key) || [];
    userWarns.push({ reason, by: message.author.tag, date: new Date() });
    warnings.set(key, userWarns);
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, message.guild.name).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, message.author.tag).replace(/{reason}/g, reason).replace(/{count}/g, userWarns.length);
    ${sendReply}\n`;
}

function generateClearCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    const sent = await message.channel.send({ embeds: [embed] });`
    : `const sent = await message.channel.send(reply);`;
  return `    const amount = parseInt(args[0]);
    if (!amount || amount < 1 || amount > ${f.maxMessages || 100}) return message.channel.send(\`${f.errorNoAmount}\`);
    const deleted = await message.channel.bulkDelete(amount, true);
    const reply = \`${f.response}\`.replace(/{count}/g, deleted.size);
    ${sendReply}
    ${f.autoDeleteResponse ? `setTimeout(() => sent.delete().catch(() => {}), ${(f.autoDeleteDelay || 5) * 1000});` : ''}\n`;
}

function generateUserInfoCode(f) {
  return `    const target = message.mentions.members.first() || message.member;
    const embed = new EmbedBuilder()
      .setTitle(\`${f.title}\`.replace(/{target}/g, target.user.tag))
      .setColor('${f.embedColor || '#ff7814'}')
      ${f.showAvatar ? `.setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 256 }))` : ''}
      .addFields(
        ${f.showId ? `{ name: 'ID', value: target.id, inline: true },` : ''}
        ${f.showJoinDate ? `{ name: 'Joined', value: target.joinedAt.toLocaleDateString(), inline: true },` : ''}
        { name: 'Created', value: target.user.createdAt.toLocaleDateString(), inline: true }
        ${f.showRoles ? `, { name: 'Roles', value: target.roles.cache.map(r => r.toString()).join(', ').slice(0, 1024) || 'None' }` : ''}
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generateServerInfoCode(f) {
  return `    const guild = message.guild;
    const embed = new EmbedBuilder()
      .setTitle(\`${f.title}\`.replace(/{server}/g, guild.name))
      .setColor('${f.embedColor || '#ff7814'}')
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .addFields(
        ${f.showMemberCount ? `{ name: 'Members', value: \`\${guild.memberCount}\`, inline: true },` : ''}
        ${f.showChannelCount ? `{ name: 'Channels', value: \`\${guild.channels.cache.size}\`, inline: true },` : ''}
        ${f.showOwner ? `{ name: 'Owner', value: \`<@\${guild.ownerId}>\`, inline: true },` : ''}
        ${f.showCreatedAt ? `{ name: 'Created', value: guild.createdAt.toLocaleDateString(), inline: true },` : ''}
        { name: 'Boost Level', value: \`\${guild.premiumTier}\`, inline: true }
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generateHelpCode(f, prefix, allCmds) {
  return `    const embed = new EmbedBuilder()
      .setTitle('${f.title}')
      .setDescription('${f.description || ''}')
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        ${allCmds.map(c => `{ name: '${prefix}${c.fields.commandName}', value: '${c.description}', inline: true }`).join(',\n        ')}
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generatePingCode(f) {
  return `    const sent = await message.channel.send('Pinging...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);
    sent.edit(\`${f.response}\`.replace(/{latency}/g, latency).replace(/{apiLatency}/g, apiLatency));\n`;
}

function generateSayCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    message.channel.send(text);\n`;
}

function generateAnnounceCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send('❌ Please provide a message.');
    const embed = new EmbedBuilder().setTitle('${f.title}').setDescription(text).setColor('${f.embedColor || '#ff7814'}').setTimestamp().setFooter({ text: \`Announced by \${message.author.tag}\` });
    const ch = ${f.targetChannel ? `message.guild.channels.cache.get('${f.targetChannel}') || message.channel` : 'message.channel'};
    ch.send({ ${f.mentionEveryone ? `content: '@everyone',` : ''} embeds: [embed] });\n`;
}

function generateCustomCode(f) {
  return `    const reply = \`${f.response || 'Hello!'}\`.replace(/{author}/g, message.author.tag).replace(/{server}/g, message.guild.name).replace(/{target}/g, message.mentions.users.first()?.tag || 'nobody').replace(/{args}/g, args.join(' '));
    ${f.useEmbed ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(reply);`}\n`;
}

// ─── New Code Generators ───
function generatePollCode(f) {
  return `    const question = args.join(' ');
    if (!question) return message.channel.send('❌ Provide a question!');
    const embed = new EmbedBuilder().setTitle('📊 Poll').setDescription(question).setColor('${f.embedColor || '#ff7814'}').setFooter({ text: \`Poll by \${message.author.tag}\` }).setTimestamp();
    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('👍'); await msg.react('👎');\n`;
}

function generateGiveawayCode(f) {
  return `    const prize = args.join(' ');
    if (!prize) return message.channel.send('❌ Provide a prize!');
    const embed = new EmbedBuilder().setTitle('🎉 GIVEAWAY 🎉').setDescription(\`**Prize:** \${prize}\\n\\nReact with 🎉 to enter!\`).setColor('${f.embedColor || '#ff7814'}').setFooter({ text: \`Hosted by \${message.author.tag}\` }).setTimestamp();
    const msg = await message.channel.send({ embeds: [embed] });
    await msg.react('🎉');\n`;
}

function generateTicketCode(f) {
  return `    const existing = message.guild.channels.cache.find(c => c.name === \`ticket-\${message.author.username}\`);
    if (existing) return message.reply('❌ You already have an open ticket: ' + existing.toString());
    const ch = await message.guild.channels.create({
      name: \`ticket-\${message.author.username}\`,
      type: ChannelType.GuildText,
      ${f.ticketCategory ? `parent: '${f.ticketCategory}',` : ''}
      permissionOverwrites: [
        { id: message.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: message.author.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
        ${f.staffRoleId ? `{ id: '${f.staffRoleId}', allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },` : ''}
      ]
    });
    ch.send(\`🎫 Ticket opened by \${message.author}. Staff will assist you shortly.\`);
    message.channel.send(\`${f.response}\`.replace(/{channel}/g, ch.toString()));\n`;
}

function generateAvatarCode(f) {
  return `    const user = message.mentions.users.first() || message.author;
    const embed = new EmbedBuilder()
      .setTitle(\`\${user.tag}'s Avatar\`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateSlowmodeCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const seconds = parseInt(args[0]);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600) return message.channel.send('❌ Provide seconds (0-21600).');
    await message.channel.setRateLimitPerUser(seconds);
    const reply = \`${f.response}\`.replace(/{duration}/g, seconds);
    ${sendReply}\n`;
}

function generateLockCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: false });
    const reply = \`${f.response}\`.replace(/{author}/g, message.author.tag);
    ${sendReply}\n`;
}

function generateUnlockCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    await message.channel.permissionOverwrites.edit(message.guild.id, { SendMessages: true });
    const reply = \`${f.response}\`.replace(/{author}/g, message.author.tag);
    ${sendReply}\n`;
}

function generateUnbanCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
      message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const userId = args[0];
    if (!userId) return message.channel.send(\`${f.errorNoTarget}\`);
    try {
      await message.guild.bans.remove(userId);
      const reply = \`${f.response}\`.replace(/{target}/g, userId);
      ${sendReply}
    } catch(e) { message.channel.send('❌ Could not unban. Check the ID.'); }\n`;
}

function generateSnipeCode(f) {
  return `    const snipe = snipes.get(message.channel.id);
    if (!snipe) return message.channel.send('❌ Nothing to snipe!');
    const embed = new EmbedBuilder()
      .setAuthor({ name: snipe.author, iconURL: snipe.avatar })
      .setDescription(snipe.content || '*No text content*')
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Deleted \${Math.round((Date.now() - snipe.timestamp) / 1000)}s ago\` });
    message.channel.send({ embeds: [embed] });\n`;
}

function generate8BallCode(f) {
  return `    const question = args.join(' ');
    if (!question) return message.channel.send(\`${f.errorNoMessage}\`);
    const answers = ['🎱 Yes.','🎱 No.','🎱 Maybe.','🎱 Absolutely!','🎱 Definitely not.','🎱 Ask again later.','🎱 It is certain.','🎱 Very doubtful.','🎱 Most likely.','🎱 Don\\'t count on it.','🎱 Without a doubt.','🎱 My sources say no.','🎱 Outlook good.','🎱 Signs point to yes.'];
    const answer = answers[Math.floor(Math.random() * answers.length)];
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('🎱 Magic 8 Ball').addFields({name:'Question',value:question},{name:'Answer',value:answer}).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(answer);`}\n`;
}

function generateCoinflipCode(f) {
  return `    const result = Math.random() < 0.5 ? '🪙 **Heads!**' : '🪙 **Tails!**';
    message.channel.send(result);\n`;
}

function generateRollCode(f) {
  return `    const sides = parseInt(args[0]) || 6;
    const result = Math.floor(Math.random() * sides) + 1;
    message.channel.send(\`🎲 You rolled a **\${result}** (d\${sides})\`);\n`;
}

function generateAfkCode(f) {
  return `    const reason = args.join(' ') || 'AFK';
    afkUsers.set(message.author.id, reason);
    message.channel.send(\`${f.response}\`.replace(/{author}/g, message.author.tag).replace(/{args}/g, reason));\n`;
}

function generateRoleInfoCode(f) {
  return `    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLowerCase());
    if (!role) return message.channel.send('❌ Mention a role or provide its name.');
    const embed = new EmbedBuilder()
      .setTitle(\`Role: \${role.name}\`)
      .setColor(role.hexColor || '${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'ID', value: role.id, inline: true },
        { name: 'Color', value: role.hexColor, inline: true },
        { name: 'Members', value: \`\${role.members.size}\`, inline: true },
        { name: 'Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true },
        { name: 'Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
        { name: 'Created', value: role.createdAt.toLocaleDateString(), inline: true }
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generateNicknameCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const nick = args.slice(1).join(' ') || '';
    await target.setNickname(nick || null);
    const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag);
    ${sendReply}\n`;
}

function generateEmbedCmdCode(f) {
  return `    const embed = new EmbedBuilder()
      ${f.embedTitle ? `.setTitle(\`${f.embedTitle}\`)` : ''}
      ${f.embedDesc ? `.setDescription(\`${f.embedDesc}\`)` : ''}
      .setColor('${f.embedColor || '#ff7814'}')
      ${f.embedThumb ? `.setThumbnail('${f.embedThumb}')` : ''}
      ${f.embedImage ? `.setImage('${f.embedImage}')` : ''}
      ${f.embedFooter ? `.setFooter({ text: '${f.embedFooter}' })` : ''}
      .setTimestamp();
    message.channel.send({ embeds: [embed] });\n`;
}

function generateReportCode(f) {
  const sendReply = f.successEmbed
    ? `const confirmEmbed = new EmbedBuilder().setDescription(\`${f.response}\`).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [confirmEmbed] });`
    : `message.channel.send(\`${f.response}\`);`;
  return `    const target = message.mentions.members.first();
    if (!target || args.length < 2) return message.channel.send(\`${f.errorNoTarget}\`);
    const reason = args.slice(1).join(' ');
    const embed = new EmbedBuilder()
      .setTitle('🚨 User Report')
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'Reported User', value: \`\${target.user.tag} (\${target.id})\`, inline: true },
        { name: 'Reported By', value: \`\${message.author.tag}\`, inline: true },
        { name: 'Channel', value: message.channel.toString(), inline: true },
        { name: 'Reason', value: reason }
      ).setTimestamp();
    ${f.reportChannelId ? `const reportCh = message.guild.channels.cache.get('${f.reportChannelId}');
    if (reportCh) reportCh.send({ embeds: [embed] });` : `message.channel.send({ embeds: [embed] });`}
    ${sendReply}\n`;
}

function generateSuggestCode(f) {
  return `    const suggestion = args.join(' ');
    if (!suggestion) return message.channel.send(\`${f.errorNoMessage}\`);
    const embed = new EmbedBuilder()
      .setTitle('💡 Suggestion')
      .setDescription(suggestion)
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Suggested by \${message.author.tag}\` })
      .setTimestamp();
    ${f.suggestChannelId ? `const suggestCh = message.guild.channels.cache.get('${f.suggestChannelId}');
    const target = suggestCh || message.channel;` : `const target = message.channel;`}
    const msg = await target.send({ embeds: [embed] });
    await msg.react('👍'); await msg.react('👎');
    message.channel.send(\`${f.response}\`);\n`;
}

function generateRpsCode(f) {
  return `    const choices = ['rock', 'paper', 'scissors'];
    const userChoice = args[0]?.toLowerCase();
    if (!choices.includes(userChoice)) return message.channel.send(\`${f.errorNoMessage}\`);
    const botChoice = choices[Math.floor(Math.random() * 3)];
    const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
    let result;
    if (userChoice === botChoice) result = "It's a **tie**!";
    else if ((userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'paper' && botChoice === 'rock') || (userChoice === 'scissors' && botChoice === 'paper')) result = 'You **win**! 🎉';
    else result = 'You **lose**! 😢';
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('Rock Paper Scissors').setDescription(\`You: \${emojis[userChoice]} vs Bot: \${emojis[botChoice]}\\n\\n\${result}\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`\${emojis[userChoice]} vs \${emojis[botChoice]} — \${result}\`);`}\n`;
}

function generateTriviaCode(f) {
  return `    const triviaQs = [
      { q: 'What is the largest planet in our solar system?', a: 'jupiter', display: 'Jupiter' },
      { q: 'How many sides does a hexagon have?', a: '6', display: '6' },
      { q: 'What language is Discord mostly written in?', a: 'python', display: 'Python' },
      { q: 'What year was Discord founded?', a: '2015', display: '2015' },
      { q: 'What is the chemical symbol for gold?', a: 'au', display: 'Au' },
      { q: 'How many bones are in the human body?', a: '206', display: '206' },
      { q: 'What planet is known as the Red Planet?', a: 'mars', display: 'Mars' },
      { q: 'What is the hardest natural substance?', a: 'diamond', display: 'Diamond' },
      { q: 'How many bits are in a byte?', a: '8', display: '8' },
      { q: 'What gas do plants absorb from the atmosphere?', a: 'carbon dioxide', display: 'Carbon Dioxide' }
    ];
    const trivia = triviaQs[Math.floor(Math.random() * triviaQs.length)];
    const embed = new EmbedBuilder().setTitle('🧠 Trivia').setDescription(trivia.q + '\\n\\nYou have ${f.triviaTimeout || '15'} seconds!').setColor('${f.embedColor || '#ff7814'}');
    await message.channel.send({ embeds: [embed] });
    const filter = m => m.author.id === message.author.id;
    try {
      const collected = await message.channel.awaitMessages({ filter, max: 1, time: ${(parseInt(f.triviaTimeout) || 15) * 1000}, errors: ['time'] });
      const answer = collected.first().content.toLowerCase().trim();
      if (answer === trivia.a) message.channel.send('✅ Correct! The answer was **' + trivia.display + '**!');
      else message.channel.send('❌ Wrong! The correct answer was **' + trivia.display + '**.');
    } catch(e) { message.channel.send('⏰ Time\\'s up! The answer was **' + trivia.display + '**.'); }\n`;
}

function generateAddRoleCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!target || !role) return message.channel.send(\`${f.errorNoTarget}\`);
    try {
      await target.roles.add(role);
      const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{role}/g, role.name);
      ${sendReply}
    } catch(e) { message.channel.send('❌ I cannot assign that role. Check hierarchy.'); }\n`;
}

function generateRemoveRoleCode(f) {
  const sendReply = f.successEmbed
    ? `const embed = new EmbedBuilder().setDescription(reply).setColor('${f.embedColor || '#ff7814'}').setTimestamp();
    message.channel.send({ embeds: [embed] });`
    : `message.channel.send(reply);`;
  return `    const target = message.mentions.members.first();
    const role = message.mentions.roles.first();
    if (!target || !role) return message.channel.send(\`${f.errorNoTarget}\`);
    try {
      await target.roles.remove(role);
      const reply = \`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{role}/g, role.name);
      ${sendReply}
    } catch(e) { message.channel.send('❌ I cannot remove that role. Check hierarchy.'); }\n`;
}

function generateReminderCode(f) {
  return `    const timeArg = args[0];
    const reminderMsg = args.slice(1).join(' ');
    if (!timeArg || !reminderMsg) return message.channel.send(\`${f.errorNoMessage}\`);
    const ms = parseDuration(timeArg);
    if (!ms) return message.channel.send('❌ Invalid time format. Use 10s, 5m, 1h, 1d');
    message.channel.send(\`${f.response}\`.replace(/{duration}/g, timeArg));
    setTimeout(() => {
      message.channel.send(\`⏰ <@\${message.author.id}> Reminder: \${reminderMsg}\`);
    }, ms);\n`;
}

function generateBannerCode(f) {
  return `    const user = message.mentions.users.first() || message.author;
    const fetched = await user.fetch(true);
    const banner = fetched.bannerURL({ dynamic: true, size: 1024 });
    if (!banner) return message.channel.send('❌ This user has no banner.');
    const embed = new EmbedBuilder()
      .setTitle(\`\${user.tag}'s Banner\`)
      .setImage(banner)
      .setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateWhoisCode(f) {
  return `    const target = message.mentions.members.first() || message.member;
    const user = await target.user.fetch(true);
    const flags = user.flags?.toArray() || [];
    const badgeMap = { Staff: '👨‍💻', Partner: '🤝', BugHunterLevel1: '🐛', HypeSquadOnlineHouse1: '🏠', HypeSquadOnlineHouse2: '🏠', HypeSquadOnlineHouse3: '🏠', PremiumEarlySupporter: '👑', VerifiedDeveloper: '✅', ActiveDeveloper: '🔨', Nitro: '💎' };
    const badges = flags.map(f => badgeMap[f] || f).join(' ') || 'None';
    const embed = new EmbedBuilder()
      .setTitle(\`\${target.user.tag}\`)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true, size: 256 }))
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'ID', value: target.id, inline: true },
        { name: 'Nickname', value: target.nickname || 'None', inline: true },
        { name: 'Badges', value: badges, inline: true },
        { name: 'Joined Server', value: \`<t:\${Math.floor(target.joinedTimestamp / 1000)}:R>\`, inline: true },
        { name: 'Account Created', value: \`<t:\${Math.floor(target.user.createdTimestamp / 1000)}:R>\`, inline: true },
        ${f.showBoosting ? `{ name: 'Boosting', value: target.premiumSince ? \`Since <t:\${Math.floor(target.premiumSinceTimestamp / 1000)}:R>\` : 'No', inline: true },` : ''}
        { name: 'Roles', value: target.roles.cache.filter(r => r.id !== target.guild.id).map(r => r.toString()).join(', ').slice(0, 1024) || 'None' }
      );
    const bannerUrl = user.bannerURL({ dynamic: true, size: 512 });
    if (bannerUrl) embed.setImage(bannerUrl);
    message.channel.send({ embeds: [embed] });\n`;
}

function generateChannelInfoCode(f) {
  return `    const ch = message.mentions.channels.first() || message.channel;
    const embed = new EmbedBuilder()
      .setTitle(\`#\${ch.name}\`)
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'ID', value: ch.id, inline: true },
        { name: 'Type', value: \`\${ch.type}\`, inline: true },
        { name: 'Topic', value: ch.topic || 'None', inline: false },
        { name: 'Created', value: \`<t:\${Math.floor(ch.createdTimestamp / 1000)}:R>\`, inline: true },
        { name: 'NSFW', value: ch.nsfw ? 'Yes' : 'No', inline: true },
        { name: 'Slowmode', value: ch.rateLimitPerUser ? \`\${ch.rateLimitPerUser}s\` : 'Off', inline: true }
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generateLeaderboardCode(f) {
  return `    const guildWarnings = [];
    for (const [key, warns] of warnings) {
      if (key.startsWith(message.guild.id + '-')) {
        const userId = key.split('-')[1];
        guildWarnings.push({ userId, count: warns.length });
      }
    }
    guildWarnings.sort((a, b) => b.count - a.count);
    const top = guildWarnings.slice(0, ${f.maxDisplay || 10});
    if (top.length === 0) return message.channel.send('No warnings recorded yet.');
    const desc = top.map((w, i) => \`\${i + 1}. <@\${w.userId}> — **\${w.count}** warning\${w.count > 1 ? 's' : ''}\`).join('\\n');
    const embed = new EmbedBuilder()
      .setTitle('⚠️ Warning Leaderboard')
      .setDescription(desc)
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Showing top \${top.length}\` });
    message.channel.send({ embeds: [embed] });\n`;
}

// ─── Code Generators (Batch 2 — Moderation) ───
function generateSoftbanCode(f) {
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!target.bannable) return message.channel.send('❌ I cannot ban this user.');
    const reason = args.slice(1).join(' ') || 'Softban';
    await target.ban({ deleteMessageDays: ${f.deleteDays || 7}, reason });
    await message.guild.bans.remove(target.id);
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, message.author.tag));\n`;
}

function generateNukeCode(f) {
  return `    const pos = message.channel.position;
    const clone = await message.channel.clone();
    await clone.setPosition(pos);
    await message.channel.delete();
    clone.send(\`${f.response}\`.replace(/{author}/g, message.author.tag));\n`;
}

function generateVoiceActionCode(f, action) {
  const act = action === 'disconnect' ? 'disconnect()' : action === 'mute' ? 'setMute(true)' : 'setDeaf(true)';
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!target.voice.channel) return message.channel.send('❌ User is not in a voice channel.');
    await target.voice.${act};
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag));\n`;
}

function generateClearWarnsCode(f) {
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const key = \`\${message.guild.id}-\${target.id}\`;
    warnings.delete(key);
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag));\n`;
}

function generateWarnCountCode(f) {
  return `    const target = message.mentions.members.first() || message.member;
    const key = \`\${message.guild.id}-\${target.id}\`;
    const warns = warnings.get(key) || [];
    const embed = new EmbedBuilder()
      .setTitle(\`⚠️ Warnings for \${target.user.tag}\`)
      .setDescription(warns.length ? warns.map((w, i) => \`\${i + 1}. \${w.reason} — by \${w.by}\`).join('\\n') : 'No warnings.')
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Total: \${warns.length}\` });
    message.channel.send({ embeds: [embed] });\n`;
}

function generateJailCode(f, type) {
  if (type === 'jail') {
    return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    ${f.roleId ? `const role = message.guild.roles.cache.get('${f.roleId}');
    if (role) await target.roles.add(role);` : `// Set jail role ID in config`}
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag));\n`;
  }
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    ${f.roleId ? `const role = message.guild.roles.cache.get('${f.roleId}');
    if (role) await target.roles.remove(role);` : `// Set jail role ID in config`}
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag));\n`;
}

function generateTempbanCode(f) {
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!target.bannable) return message.channel.send('❌ I cannot ban this user.');
    const durationStr = args[1] || '${f.defaultDuration || '1d'}';
    const reason = args.slice(2).join(' ') || 'Temporary ban';
    const ms = parseDuration(durationStr);
    if (!ms) return message.channel.send('❌ Invalid duration.');
    await target.ban({ reason: \`Tempban: \${reason}\` });
    setTimeout(async () => { try { await message.guild.bans.remove(target.id); } catch(e) {} }, ms);
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{duration}/g, durationStr));\n`;
}

function generateHideCode(f, unhide) {
  const perm = unhide ? 'null' : 'false';
  return `    await message.channel.permissionOverwrites.edit(message.guild.id, { ViewChannel: ${perm} });
    message.channel.send(\`${f.response}\`.replace(/{author}/g, message.author.tag));\n`;
}

function generateDehoistCode(f) {
  return `    const members = await message.guild.members.fetch();
    let count = 0;
    for (const [, m] of members) {
      if (m.displayName.match(/^[^a-zA-Z0-9]/)) {
        try { await m.setNickname('dehoisted'); count++; } catch(e) {}
      }
    }
    message.channel.send(\`${f.response}\`.replace(/{count}/g, count));\n`;
}

function generateModNoteCode(f) {
  return `    const target = message.mentions.members.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const note = args.slice(1).join(' ');
    if (!note) return message.channel.send('❌ Provide a note.');
    const key = \`\${message.guild.id}-\${target.id}\`;
    const notes = modNotes.get(key) || [];
    notes.push({ note, by: message.author.tag, date: new Date().toISOString() });
    modNotes.set(key, notes);
    message.channel.send(\`${f.response}\`.replace(/{target}/g, target.user.tag));\n`;
}

function generateMassRoleCode(f) {
  return `    const role = message.mentions.roles.first();
    if (!role) return message.channel.send(\`${f.errorNoTarget}\`);
    message.channel.send(\`${f.response}\`);
    const members = await message.guild.members.fetch();
    let count = 0;
    for (const [, m] of members) {
      if (!m.roles.cache.has(role.id)) { try { await m.roles.add(role); count++; } catch(e) {} }
    }
    message.channel.send(\`✅ Added **\${role.name}** to **\${count}** members.\`);\n`;
}

// ─── Code Generators (Batch 2 — Utility) ───
function generateCalcCode(f) {
  return `    const expr = args.join(' ');
    if (!expr) return message.channel.send(\`${f.errorNoMessage}\`);
    try {
      const sanitized = expr.replace(/[^0-9+\\-*/().%\\s]/g, '');
      const result = Function('"use strict"; return (' + sanitized + ')')();
      ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('🔢 Calculator').addFields({name:'Expression',value:\`\${expr}\`},{name:'Result',value:\`\${result}\`}).setColor('${f.embedColor || '#ff7814'}');
      message.channel.send({ embeds: [embed] });` : `message.channel.send(\`🔢 \${expr} = **\${result}**\`);`}
    } catch(e) { message.channel.send('❌ Invalid expression.'); }\n`;
}

function generateChooseCode(f) {
  return `    const options = args.join(' ').split('|').map(o => o.trim()).filter(Boolean);
    if (options.length < 2) return message.channel.send(\`${f.errorNoMessage}\`);
    const chosen = options[Math.floor(Math.random() * options.length)];
    message.channel.send(\`🤔 I choose: **\${chosen}**\`);\n`;
}

function generateRateCode(f) {
  return `    const thing = args.join(' ');
    if (!thing) return message.channel.send(\`${f.errorNoMessage}\`);
    const rating = Math.floor(Math.random() * 11);
    const bar = '█'.repeat(rating) + '░'.repeat(10 - rating);
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('⭐ Rating').setDescription(\`I rate **\${thing}** a **\${rating}/10**\\n\${bar}\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`⭐ I rate **\${thing}** a **\${rating}/10** \${bar}\`);`}\n`;
}

function generateUptimeCode(f) {
  return `    const uptime = process.uptime();
    const d = Math.floor(uptime / 86400);
    const h = Math.floor((uptime % 86400) / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    const embed = new EmbedBuilder().setTitle('⏱️ Uptime').setDescription(\`\${d}d \${h}h \${m}m \${s}s\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateInviteBotCode(f) {
  return `    const link = \`https://discord.com/api/oauth2/authorize?client_id=\${client.user.id}&permissions=8&scope=bot\`;
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('📨 Invite Me!').setDescription(\`[Click here to invite](\${link})\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`📨 Invite: \${link}\`);`}\n`;
}

function generateBotInfoCode(f) {
  return `    const embed = new EmbedBuilder()
      .setTitle(\`🤖 \${client.user.tag}\`)
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'Servers', value: \`\${client.guilds.cache.size}\`, inline: true },
        { name: 'Users', value: \`\${client.users.cache.size}\`, inline: true },
        { name: 'Channels', value: \`\${client.channels.cache.size}\`, inline: true },
        { name: 'Uptime', value: \`\${Math.floor(process.uptime() / 3600)}h \${Math.floor((process.uptime() % 3600) / 60)}m\`, inline: true },
        { name: 'Ping', value: \`\${client.ws.ping}ms\`, inline: true },
        { name: 'Memory', value: \`\${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB\`, inline: true }
      ).setTimestamp();
    message.channel.send({ embeds: [embed] });\n`;
}

function generateMemberCountCode(f) {
  return `    const guild = message.guild;
    const embed = new EmbedBuilder()
      .setTitle('👥 Member Count')
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'Total', value: \`\${guild.memberCount}\`, inline: true },
        { name: 'Humans', value: \`\${guild.members.cache.filter(m => !m.user.bot).size}\`, inline: true },
        { name: 'Bots', value: \`\${guild.members.cache.filter(m => m.user.bot).size}\`, inline: true }
      );
    message.channel.send({ embeds: [embed] });\n`;
}

function generateTextTransformCode(f, type) {
  const transforms = {
    reverse: `text.split('').reverse().join('')`,
    binary: `text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')`,
    hex: `text.split('').map(c => c.charCodeAt(0).toString(16)).join(' ')`,
    base64: `Buffer.from(text).toString('base64')`
  };
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const result = ${transforms[type]};
    message.channel.send(\`\\\`\\\`\\\`\\n\${result}\\n\\\`\\\`\\\`\`);\n`;
}

function generateEnlargeCode(f) {
  return `    const emoji = args[0];
    if (!emoji) return message.channel.send(\`${f.errorNoMessage}\`);
    const match = emoji.match(/<(a?):([a-zA-Z0-9_]+):(\\d+)>/);
    if (match) {
      const ext = match[1] === 'a' ? 'gif' : 'png';
      const url = \`https://cdn.discordapp.com/emojis/\${match[3]}.\${ext}?size=256\`;
      const embed = new EmbedBuilder().setTitle(match[2]).setImage(url).setColor('${f.embedColor || '#ff7814'}');
      message.channel.send({ embeds: [embed] });
    } else { message.channel.send(emoji + ' (unicode emoji — cannot enlarge further)'); }\n`;
}

function generateServerIconCode(f) {
  return `    const icon = message.guild.iconURL({ dynamic: true, size: 1024 });
    if (!icon) return message.channel.send('❌ This server has no icon.');
    const embed = new EmbedBuilder().setTitle(\`\${message.guild.name}'s Icon\`).setImage(icon).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateSimpleInfoCode(f, type) {
  if (type === 'rolecount') return `    message.channel.send(\`🏷️ This server has **\${message.guild.roles.cache.size}** roles.\`);\n`;
  if (type === 'channelcount') return `    message.channel.send(\`#️⃣ This server has **\${message.guild.channels.cache.size}** channels.\`);\n`;
  if (type === 'emotecount') return `    const animated = message.guild.emojis.cache.filter(e => e.animated).size;
    const standard = message.guild.emojis.cache.filter(e => !e.animated).size;
    message.channel.send(\`📊 Emojis: **\${standard}** static, **\${animated}** animated (**\${standard + animated}** total)\`);\n`;
  return '';
}

function generateFirstMsgCode(f) {
  return `    const msgs = await message.channel.messages.fetch({ after: '0', limit: 1 });
    const first = msgs.first();
    if (!first) return message.channel.send('❌ No messages found.');
    const embed = new EmbedBuilder()
      .setTitle('📜 First Message')
      .setDescription(first.content || '*No text*')
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields({ name: 'Author', value: first.author.tag, inline: true }, { name: 'Date', value: first.createdAt.toLocaleDateString(), inline: true })
      .setURL(first.url);
    message.channel.send({ embeds: [embed] });\n`;
}

function generateTimestampCode(f) {
  return `    const input = args.join(' ');
    if (!input) return message.channel.send(\`${f.errorNoMessage}\`);
    const date = new Date(input);
    if (isNaN(date)) return message.channel.send('❌ Invalid date.');
    const unix = Math.floor(date.getTime() / 1000);
    message.channel.send(\`🕐 Timestamps for \${input}:\\n<t:\${unix}:f> — \\\`<t:\${unix}:f>\\\`\\n<t:\${unix}:R> — \\\`<t:\${unix}:R>\\\`\\n<t:\${unix}:D> — \\\`<t:\${unix}:D>\\\`\`);\n`;
}

function generateColorInfoCode(f) {
  return `    const hex = args[0];
    if (!hex || !hex.match(/^#?[0-9a-fA-F]{6}$/)) return message.channel.send(\`${f.errorNoMessage}\`);
    const color = hex.startsWith('#') ? hex : '#' + hex;
    const embed = new EmbedBuilder().setTitle(\`🎨 Color: \${color}\`).setColor(color).setDescription(\`Hex: \${color}\\nRGB: \${parseInt(color.slice(1,3),16)}, \${parseInt(color.slice(3,5),16)}, \${parseInt(color.slice(5,7),16)}\`);
    message.channel.send({ embeds: [embed] });\n`;
}

function generateCountdownCode(f) {
  return `    const seconds = parseInt(args[0]);
    if (!seconds || seconds < 1 || seconds > 60) return message.channel.send(\`${f.errorNoMessage}\`);
    const msg = await message.channel.send(\`⏳ Countdown: **\${seconds}**\`);
    let remaining = seconds;
    const interval = setInterval(() => {
      remaining--;
      if (remaining <= 0) { clearInterval(interval); msg.edit('🎉 **Time\\'s up!**'); }
      else msg.edit(\`⏳ Countdown: **\${remaining}**\`);
    }, 1000);\n`;
}

function generateEmbedSayCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const embed = new EmbedBuilder().setDescription(text).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateEditSnipeCode(f) {
  return `    const snipe = editSnipes.get(message.channel.id);
    if (!snipe) return message.channel.send('❌ No edited messages to snipe!');
    const embed = new EmbedBuilder()
      .setAuthor({ name: snipe.author, iconURL: snipe.avatar })
      .addFields({ name: 'Before', value: snipe.oldContent || '*empty*' }, { name: 'After', value: snipe.newContent || '*empty*' })
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Edited \${Math.round((Date.now() - snipe.timestamp) / 1000)}s ago\` });
    message.channel.send({ embeds: [embed] });\n`;
}

function generateStealCode(f) {
  return `    const emoji = args[0];
    if (!emoji) return message.channel.send(\`${f.errorNoMessage}\`);
    const match = emoji.match(/<(a?):([a-zA-Z0-9_]+):(\\d+)>/);
    if (!match) return message.channel.send('❌ Provide a custom emoji.');
    const ext = match[1] === 'a' ? 'gif' : 'png';
    const url = \`https://cdn.discordapp.com/emojis/\${match[3]}.\${ext}\`;
    try {
      const added = await message.guild.emojis.create({ attachment: url, name: match[2] });
      message.channel.send(\`✅ Added emoji: \${added}\`);
    } catch(e) { message.channel.send('❌ Failed to add emoji. Check permissions and emoji slots.'); }\n`;
}

function generateAfkListCode(f) {
  return `    if (afkUsers.size === 0) return message.channel.send('💤 No one is AFK.');
    const list = [...afkUsers.entries()].map(([id, reason]) => \`<@\${id}> — \${reason}\`).join('\\n');
    const embed = new EmbedBuilder().setTitle('💤 AFK Users').setDescription(list).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateRemindListCode(f) {
  return `    message.channel.send('📋 Reminder list is stored in memory only for this session. Use the remind command to set new reminders.');\n`;
}

function generateSelfNickCode(f) {
  return `    const nick = args.join(' ');
    if (!nick) return message.channel.send(\`${f.errorNoMessage}\`);
    try {
      await message.member.setNickname(nick);
      message.channel.send(\`${f.response}\`);
    } catch(e) { message.channel.send('❌ I cannot change your nickname.'); }\n`;
}

// ─── Code Generators (Batch 2 — Fun) ───
function generateRandomPoolCode(f, type) {
  const pools = {
    joke: `['Why don\\'t scientists trust atoms? Because they make up everything!','I told my computer I needed a break, and now it won\\'t stop sending me vacation ads.','Why did the scarecrow win an award? He was outstanding in his field!','What do you call a fake noodle? An impasta!','Why don\\'t eggs tell jokes? They\\'d crack each other up!','I\\'m reading a book about anti-gravity. It\\'s impossible to put down!','What do you call a bear with no teeth? A gummy bear!','Why did the bicycle fall over? Because it was two-tired!','What do you call cheese that isn\\'t yours? Nacho cheese!','I told my wife she was drawing her eyebrows too high. She looked surprised.']`,
    fact: `['Honey never spoils — archaeologists have found 3000-year-old honey that was still edible.','A group of flamingos is called a "flamboyance."','Octopuses have three hearts and blue blood.','The shortest war in history lasted 38 minutes (Britain vs Zanzibar).','A day on Venus is longer than its year.','Bananas are berries, but strawberries are not.','The inventor of the Pringles can is buried in one.','There are more possible games of chess than atoms in the observable universe.','Cows have best friends and get stressed when separated.','The first oranges weren\\'t orange — they were green.']`,
    quote: `['"The only way to do great work is to love what you do." — Steve Jobs','"In the middle of difficulty lies opportunity." — Albert Einstein','"Be yourself; everyone else is already taken." — Oscar Wilde','"The best time to plant a tree was 20 years ago. The second best time is now." — Chinese Proverb','"It does not matter how slowly you go as long as you do not stop." — Confucius','"Believe you can and you\\'re halfway there." — Theodore Roosevelt','"The only impossible journey is the one you never begin." — Tony Robbins','"Success is not final, failure is not fatal: it is the courage to continue that counts." — Winston Churchill']`,
    fortune: `['🥠 You will find great success today.','🥠 A surprise is coming your way.','🥠 Your hard work will pay off soon.','🥠 An unexpected friend will appear.','🥠 Good things come to those who wait.','🥠 You will make someone smile today.','🥠 A great adventure awaits you.','🥠 Trust your instincts.','🥠 New opportunities are on the horizon.','🥠 Your creativity will be rewarded.']`,
    pickup: `['Are you a magician? Because whenever I look at you, everyone else disappears.','Do you have a map? I just got lost in your eyes.','Are you a campfire? Because you\\'re hot and I want s\\'more.','Do you believe in love at first sight, or should I walk by again?','Is your name Google? Because you have everything I\\'ve been searching for.','Are you a time traveler? Because I see you in my future.','Do you have a Band-Aid? I just scraped my knee falling for you.','Are you a parking ticket? Because you\\'ve got fine written all over you.']`,
    dare: `['🎯 Send a message in a random channel saying hi!','🎯 Change your nickname to something embarrassing for 10 minutes.','🎯 Post a selfie in the chat.','🎯 Compliment the last person who sent a message.','🎯 Type with your eyes closed for the next 3 messages.','🎯 Use only emojis for the next 5 minutes.','🎯 Share your most recent photo.','🎯 Sing a song in voice chat.']`,
    truth: `['❓ What is your most embarrassing moment?','❓ What\\'s the last lie you told?','❓ What\\'s your biggest fear?','❓ What\\'s a secret you\\'ve never told anyone?','❓ Who was your first crush?','❓ What\\'s the weirdest thing you\\'ve ever done?','❓ If you could be invisible for a day, what would you do?','❓ What\\'s your guilty pleasure?']`,
    paranoia: `['😱 Who in this server do you think is most likely to become famous?','😱 Who here would survive a zombie apocalypse?','😱 Who do you think has the best profile picture?','😱 Who would you want on your team in a game?','😱 Who here is the funniest?','😱 Who would you trust with a secret?','😱 Who is most likely to become a millionaire?']`,
    neverhavei: `['🙅 Never have I ever stayed up past 3 AM.','🙅 Never have I ever eaten an entire pizza by myself.','🙅 Never have I ever broken a bone.','🙅 Never have I ever been on a plane.','🙅 Never have I ever cheated on a test.','🙅 Never have I ever had a crush on a fictional character.','🙅 Never have I ever gone skydiving.','🙅 Never have I ever lied about my age online.']`,
    wyr: `['🤷 Would you rather have unlimited money or unlimited knowledge?','🤷 Would you rather be able to fly or be invisible?','🤷 Would you rather live without music or without movies?','🤷 Would you rather have super strength or super speed?','🤷 Would you rather live in the past or the future?','🤷 Would you rather always be hot or always be cold?','🤷 Would you rather have no internet or no phone?']`,
    tod: `['🎯 Truth or Dare? React with 🇹 for truth or 🇩 for dare!','🎯 Truth: What\\'s your most used emoji?','🎯 Dare: Send a random emoji 10 times!','🎯 Truth: What\\'s the last thing you searched online?','🎯 Dare: Change your avatar for 1 hour!','🎯 Truth: What\\'s your screen time today?']`,
    meme: `['When the code works on the first try 👀','Discord mods at 3 AM: "I\\'m doing important work"','Nobody:\\nBot developers: *adds 100 more commands*','When someone pings @everyone for no reason 😤','Me: I\\'ll go to bed early\\nAlso me at 4 AM: just one more game','When the WiFi drops for 0.1 seconds 💀','That feeling when you finally fix a bug 🎉','When someone says "just one more round"']`,
    roast: `['You\\'re like a cloud — when you disappear, it\\'s a beautiful day.','I\\'d explain it to you but I left my crayons at home.','You\\'re proof that evolution CAN go in reverse.','If you were any more basic, you\\'d be a pH 14 solution.','You bring everyone so much joy... when you leave.','I\\'d roast you but my mom said I can\\'t burn trash.','You\\'re like a software update — when I see you, I think "not now."','You\\'re the reason they put instructions on shampoo.']`,
    compliment: `['💖 You\\'re an amazing person and don\\'t let anyone tell you otherwise!','💖 Your smile could light up the whole server!','💖 You make this server a better place just by being here.','💖 You\\'re so talented and everyone here appreciates you!','💖 Your kindness is contagious!','💖 You have an awesome sense of humor!','💖 You\\'re stronger than you think!','💖 The world is better with you in it!']`
  };
  const pool = pools[type] || pools.joke;
  const titles = { joke:'😂 Joke', fact:'📚 Fun Fact', quote:'💬 Quote', fortune:'🥠 Fortune', pickup:'💝 Pickup Line', dare:'🎯 Dare', truth:'❓ Truth', paranoia:'😱 Paranoia', neverhavei:'🙅 Never Have I Ever', wyr:'🤷 Would You Rather', tod:'🎯 Truth or Dare', meme:'🖼️ Meme', roast:'🔥 Roast', compliment:'💖 Compliment' };
  const title = titles[type] || type;
  return `    const pool = ${pool};
    const pick = pool[Math.floor(Math.random() * pool.length)];
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('${title}').setDescription(pick).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(pick);`}\n`;
}

function generateShipCode(f) {
  return `    const user1 = message.mentions.users.first();
    const user2 = message.mentions.users.size > 1 ? [...message.mentions.users.values()][1] : message.author;
    if (!user1) return message.channel.send(\`${f.errorNoTarget}\`);
    const percent = Math.floor(Math.random() * 101);
    const bar = '❤️'.repeat(Math.floor(percent / 10)) + '🖤'.repeat(10 - Math.floor(percent / 10));
    let verdict = percent > 80 ? 'Perfect match! 💕' : percent > 50 ? 'Pretty good! 💗' : percent > 30 ? 'There\\'s a chance... 💛' : 'Not looking great 💔';
    const embed = new EmbedBuilder().setTitle('💘 Love Calculator').setDescription(\`\${user1} x \${user2}\\n\\n\${bar}\\n**\${percent}%** — \${verdict}\`).setColor('${f.embedColor || '#ff69b4'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateSocialActionCode(f, action) {
  const msgs = {
    hug: ['gave **{target}** a big warm hug! 🤗','wrapped **{target}** in a cozy hug!','hugged **{target}** tightly! 💖'],
    slap: ['slapped **{target}**! 👋','gave **{target}** a mighty slap!','*slaps **{target}** across the face*'],
    pat: ['patted **{target}** on the head! 🤚','gave **{target}** gentle headpats!','*pat pat* Good **{target}**! ✨'],
    kiss: ['kissed **{target}**! 💋','gave **{target}** a sweet kiss! 😘','planted a kiss on **{target}**! 💕'],
    poke: ['poked **{target}**! 👉','*poke poke* **{target}**!','keeps poking **{target}**! 😄'],
    bite: ['bit **{target}**! 😬','*nom* bit **{target}**!','took a bite out of **{target}**! 🦷'],
    highfive: ['high-fived **{target}**! ✋','and **{target}** shared an epic high five! 🙌','gave **{target}** a thunderous high five!']
  };
  const pool = msgs[action] || msgs.hug;
  return `    const target = message.mentions.users.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget || '❌ Mention someone!'}\`);
    const actions = ${JSON.stringify(pool)};
    const pick = actions[Math.floor(Math.random() * actions.length)].replace(/{target}/g, target.username);
    message.channel.send(\`**\${message.author.username}** \${pick}\`);\n`;
}

function generateEmoteCode(f, type) {
  const emotes = { wink: '😉 *winks*', dab: '💃 *dabs*', cry: '😢 *cries*', laugh: '😆 *laughs out loud*', facepalm: '🤦 *facepalms*' };
  return `    message.channel.send(\`**\${message.author.username}** ${emotes[type] || '*emotes*'}\`);\n`;
}

function generateNumberGuessCode(f) {
  return `    const number = Math.floor(Math.random() * 100) + 1;
    const embed = new EmbedBuilder().setTitle('🔢 Number Guess').setDescription('I\\'m thinking of a number between 1-100. You have 5 tries!').setColor('${f.embedColor || '#ff7814'}');
    await message.channel.send({ embeds: [embed] });
    const filter = m => m.author.id === message.author.id && !isNaN(m.content);
    let tries = 5;
    const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 5 });
    collector.on('collect', (m) => {
      tries--;
      const guess = parseInt(m.content);
      if (guess === number) { message.channel.send(\`🎉 Correct! The number was **\${number}**!\`); collector.stop(); }
      else if (tries === 0) { message.channel.send(\`❌ Out of tries! The number was **\${number}**.\`); collector.stop(); }
      else message.channel.send(guess > number ? \`⬇️ Lower! (\${tries} tries left)\` : \`⬆️ Higher! (\${tries} tries left)\`);
    });\n`;
}

function generateSlotsCode(f) {
  return `    const symbols = ['🍒','🍋','🍊','🍉','⭐','💎','7️⃣'];
    const s = () => symbols[Math.floor(Math.random() * symbols.length)];
    const r1 = s(), r2 = s(), r3 = s();
    const win = r1 === r2 && r2 === r3;
    const partial = r1 === r2 || r2 === r3 || r1 === r3;
    const result = win ? '🎉 **JACKPOT!**' : partial ? '😊 So close!' : '😢 Better luck next time!';
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('🎰 Slots').setDescription(\`[ \${r1} | \${r2} | \${r3} ]\\n\\n\${result}\`).setColor(win ? '#22c55e' : '${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`🎰 [ \${r1} | \${r2} | \${r3} ] — \${result}\`);`}\n`;
}

function generatePercentRateCode(f, type) {
  const labels = { gayrate: { title: '🏳️‍🌈 Gay Rate', label: 'gay' }, simprate: { title: '💕 Simp Rate', label: 'simp' }, iqtest: { title: '🧠 IQ Test', label: 'IQ' }, howcute: { title: '🥰 Cute Rate', label: 'cute' } };
  const info = labels[type] || { title: '📊 Rate', label: 'score' };
  const isIQ = type === 'iqtest';
  return `    const target = message.mentions.users.first() || message.author;
    const val = ${isIQ ? 'Math.floor(Math.random() * 151) + 50' : 'Math.floor(Math.random() * 101)'};
    const embed = new EmbedBuilder().setTitle('${info.title}').setDescription(\`\${target} is **\${val}${isIQ ? '' : '%'}** ${info.label}!\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateMockCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const mocked = text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('');
    message.channel.send(mocked);\n`;
}

function generateUwuCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const uwu = text.replace(/[rl]/g, 'w').replace(/[RL]/g, 'W').replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1') + ' ' + ['uwu','owo','UwU','>w<','^w^'][Math.floor(Math.random() * 5)];
    message.channel.send(uwu);\n`;
}

function generateAsciiCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const big = text.toUpperCase().split('').map(c => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F1E6 + code - 65);
      if (c === ' ') return '   ';
      return c;
    }).join(' ');
    message.channel.send(big);\n`;
}

function generateEmojifyCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    const emojified = text.toLowerCase().split('').map(c => {
      if (c >= 'a' && c <= 'z') return \`:regional_indicator_\${c}:\`;
      if (c === ' ') return '  ';
      if (c >= '0' && c <= '9') return ['0️⃣','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣'][parseInt(c)];
      return c;
    }).join(' ');
    message.channel.send(emojified);\n`;
}

function generateClapCode(f) {
  return `    const text = args.join(' ');
    if (!text) return message.channel.send(\`${f.errorNoMessage}\`);
    message.channel.send(text.split(' ').join(' 👏 '));\n`;
}

function generatePPCode(f) {
  return `    const target = message.mentions.users.first() || message.author;
    const size = Math.floor(Math.random() * 12) + 1;
    message.channel.send(\`📏 \${target.username}'s pp\\n8\${'='.repeat(size)}D\`);\n`;
}

function generateFightCode(f) {
  return `    const target = message.mentions.users.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    const userHp = Math.floor(Math.random() * 50) + 50;
    const targetHp = Math.floor(Math.random() * 50) + 50;
    const winner = userHp > targetHp ? message.author : target;
    const embed = new EmbedBuilder().setTitle('⚔️ Fight!').setDescription(\`\${message.author.username} (\${userHp} HP) vs \${target.username} (\${targetHp} HP)\\n\\n🏆 **\${winner.username}** wins!\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateMarryCode(f, type) {
  if (type === 'marry') {
    return `    const target = message.mentions.users.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (target.id === message.author.id) return message.channel.send('❌ You can\\'t marry yourself!');
    if (marriages.has(message.author.id)) return message.channel.send('❌ You are already married!');
    marriages.set(message.author.id, target.id);
    marriages.set(target.id, message.author.id);
    const embed = new EmbedBuilder().setTitle('💍 Marriage!').setDescription(\`\${message.author} and \${target} are now married! 🎉💕\`).setColor('${f.embedColor || '#ff69b4'}');
    message.channel.send({ embeds: [embed] });\n`;
  }
  return `    const target = message.mentions.users.first();
    if (!target) return message.channel.send(\`${f.errorNoTarget}\`);
    if (!marriages.has(message.author.id)) return message.channel.send('❌ You are not married!');
    marriages.delete(message.author.id);
    marriages.delete(target.id);
    message.channel.send('💔 You are now divorced.');\n`;
}

// ─── Code Generators (Batch 2 — Info) ───
function generateEmojiListCode(f) {
  return `    const emojis = message.guild.emojis.cache;
    if (emojis.size === 0) return message.channel.send('😐 No custom emojis.');
    const list = emojis.map(e => e.toString()).join(' ').slice(0, 2048);
    const embed = new EmbedBuilder().setTitle(\`😀 Emojis (\${emojis.size})\`).setDescription(list).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateBoostersCode(f) {
  return `    const boosters = message.guild.members.cache.filter(m => m.premiumSince);
    if (boosters.size === 0) return message.channel.send('💎 No boosters yet.');
    const list = boosters.map(m => \`\${m.user.tag} — since <t:\${Math.floor(m.premiumSinceTimestamp / 1000)}:R>\`).join('\\n').slice(0, 2048);
    const embed = new EmbedBuilder().setTitle(\`💎 Server Boosters (\${boosters.size})\`).setDescription(list).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generatePermsCode(f) {
  return `    const target = message.mentions.members.first() || message.member;
    const perms = target.permissions.toArray().map(p => \`✅ \${p}\`).join('\\n').slice(0, 2048);
    const embed = new EmbedBuilder().setTitle(\`🔑 Permissions for \${target.user.tag}\`).setDescription(perms || 'No permissions.').setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateWhoHasCode(f) {
  return `    const role = message.mentions.roles.first();
    if (!role) return message.channel.send(\`${f.errorNoTarget}\`);
    const members = role.members.map(m => m.user.tag);
    const embed = new EmbedBuilder()
      .setTitle(\`👥 Members with \${role.name} (\${members.length})\`)
      .setDescription(members.slice(0, 50).join('\\n') || 'No members.').setColor('${f.embedColor || '#ff7814'}');
    if (members.length > 50) embed.setFooter({ text: \`And \${members.length - 50} more...\` });
    message.channel.send({ embeds: [embed] });\n`;
}

function generateRolesListCode(f) {
  return `    const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.toString()).join(', ').slice(0, 2048);
    const embed = new EmbedBuilder().setTitle(\`🏷️ Roles (\${message.guild.roles.cache.size})\`).setDescription(roles).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateMemberSortCode(f, type) {
  const sort = type === 'oldest' ? '(a, b) => a.joinedTimestamp - b.joinedTimestamp' : '(a, b) => b.joinedTimestamp - a.joinedTimestamp';
  const title = type === 'oldest' ? '👴 Oldest Members' : '👶 Newest Members';
  return `    const members = (await message.guild.members.fetch()).sort(${sort});
    const top = [...members.values()].slice(0, 10).map((m, i) => \`\${i + 1}. \${m.user.tag} — <t:\${Math.floor(m.joinedTimestamp / 1000)}:R>\`).join('\\n');
    const embed = new EmbedBuilder().setTitle('${title}').setDescription(top).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateBanListCode(f) {
  return `    const bans = await message.guild.bans.fetch();
    if (bans.size === 0) return message.channel.send('🔨 No bans.');
    const list = bans.map(b => \`\${b.user.tag} — \${b.reason || 'No reason'}\`).join('\\n').slice(0, 2048);
    const embed = new EmbedBuilder().setTitle(\`🔨 Ban List (\${bans.size})\`).setDescription(list).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateInvitesCode(f) {
  return `    const invites = await message.guild.invites.fetch();
    const inviteMap = {};
    invites.forEach(inv => { inviteMap[inv.inviter?.tag || 'Unknown'] = (inviteMap[inv.inviter?.tag || 'Unknown'] || 0) + (inv.uses || 0); });
    const sorted = Object.entries(inviteMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
    if (sorted.length === 0) return message.channel.send('📨 No invite data.');
    const desc = sorted.map(([user, uses], i) => \`\${i + 1}. **\${user}** — \${uses} invites\`).join('\\n');
    const embed = new EmbedBuilder().setTitle('📨 Invite Leaderboard').setDescription(desc).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateBotStatusCode(f) {
  return `    const embed = new EmbedBuilder()
      .setTitle('📡 Bot Status')
      .setColor('${f.embedColor || '#ff7814'}')
      .addFields(
        { name: 'Ping', value: \`\${client.ws.ping}ms\`, inline: true },
        { name: 'Uptime', value: \`\${Math.floor(process.uptime() / 3600)}h \${Math.floor((process.uptime() % 3600) / 60)}m\`, inline: true },
        { name: 'Memory', value: \`\${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}MB\`, inline: true },
        { name: 'Guilds', value: \`\${client.guilds.cache.size}\`, inline: true },
        { name: 'Users', value: \`\${client.users.cache.size}\`, inline: true },
        { name: 'Node.js', value: process.version, inline: true }
      ).setTimestamp();
    message.channel.send({ embeds: [embed] });\n`;
}

// ─── Code Generators (Batch 2 — Economy/Custom) ───
function generateBalanceCode(f) {
  return `    const target = message.mentions.users.first() || message.author;
    const bal = economy.get(target.id) || 0;
    const embed = new EmbedBuilder().setTitle('💰 Balance').setDescription(\`\${target} has **\${bal}** coins\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateWorkCode(f) {
  return `    const earnings = Math.floor(Math.random() * 500) + 100;
    const current = economy.get(message.author.id) || 0;
    economy.set(message.author.id, current + earnings);
    const jobs = ['Developer','Artist','Chef','Doctor','Teacher','Builder','Farmer','Miner'];
    const job = jobs[Math.floor(Math.random() * jobs.length)];
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('💼 Work').setDescription(\`You worked as a **\${job}** and earned **\${earnings}** coins!\\nBalance: **\${current + earnings}** coins\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`💼 You worked as a **\${job}** and earned **\${earnings}** coins!\`);`}\n`;
}

function generateDailyCode(f) {
  return `    const lastDaily = dailyCooldowns.get(message.author.id) || 0;
    const now = Date.now();
    if (now - lastDaily < 86400000) {
      const remaining = Math.ceil((86400000 - (now - lastDaily)) / 3600000);
      return message.channel.send(\`🎁 You already claimed today! Come back in ~\${remaining}h.\`);
    }
    const reward = Math.floor(Math.random() * 300) + 200;
    const current = economy.get(message.author.id) || 0;
    economy.set(message.author.id, current + reward);
    dailyCooldowns.set(message.author.id, now);
    ${f.useEmbed ? `const embed = new EmbedBuilder().setTitle('🎁 Daily Reward').setDescription(\`You claimed **\${reward}** coins!\\nBalance: **\${current + reward}** coins\`).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });` : `message.channel.send(\`🎁 Daily: +\${reward} coins! Balance: \${current + reward}\`);`}\n`;
}

function generateEcoLeaderboardCode(f) {
  return `    const sorted = [...economy.entries()].sort((a, b) => b[1] - a[1]).slice(0, ${f.maxDisplay || 10});
    if (sorted.length === 0) return message.channel.send('🏆 No economy data yet.');
    const desc = sorted.map(([id, bal], i) => \`\${i + 1}. <@\${id}> — **\${bal}** coins\`).join('\\n');
    const embed = new EmbedBuilder().setTitle('🏆 Richest Users').setDescription(desc).setColor('${f.embedColor || '#ff7814'}');
    message.channel.send({ embeds: [embed] });\n`;
}

function generateSelfRoleCode(f) {
  return `    const role = message.mentions.roles.first()${f.roleId ? ` || message.guild.roles.cache.get('${f.roleId}')` : ''};
    if (!role) return message.channel.send(\`${f.errorNoTarget || '❌ Mention a role.'}\`);
    if (message.member.roles.cache.has(role.id)) {
      await message.member.roles.remove(role);
      message.channel.send(\`🏷️ Removed **\${role.name}**!\`);
    } else {
      await message.member.roles.add(role);
      message.channel.send(\`🏷️ Added **\${role.name}**!\`);
    }\n`;
}

function generateColorRoleCode(f) {
  return `    const hex = args[0];
    if (!hex || !hex.match(/^#?[0-9a-fA-F]{6}$/)) return message.channel.send(\`${f.errorNoMessage}\`);
    const color = hex.startsWith('#') ? hex : '#' + hex;
    const roleName = \`color-\${message.author.id}\`;
    let role = message.guild.roles.cache.find(r => r.name === roleName);
    if (role) { await role.setColor(color); }
    else { role = await message.guild.roles.create({ name: roleName, color, reason: 'Color role' }); }
    await message.member.roles.add(role);
    message.channel.send(\`${f.response}\`);\n`;
}

function generateApplyCode(f) {
  return `    const embed = new EmbedBuilder()
      .setTitle('📝 Staff Application')
      .setDescription('Please answer the following questions by DM.')
      .setColor('${f.embedColor || '#ff7814'}')
      .setFooter({ text: \`Applied by \${message.author.tag}\` })
      .setTimestamp();
    ${f.targetChannel ? `const ch = message.guild.channels.cache.get('${f.targetChannel}');
    if (ch) ch.send({ embeds: [embed] });` : `message.channel.send({ embeds: [embed] });`}
    message.channel.send(\`${f.response}\`);\n`;
}

// ─── Logic Editor ───
const CONDITION_TYPES = [
  { id: 'hasRole', label: 'User has role', icon: '🏷️', fields: [{ key: 'roleId', label: 'Role ID', type: 'text', placeholder: 'Role ID' }] },
  { id: 'notHasRole', label: 'User does NOT have role', icon: '🚫', fields: [{ key: 'roleId', label: 'Role ID', type: 'text', placeholder: 'Role ID' }] },
  { id: 'hasPermission', label: 'User has permission', icon: '🔑', fields: [{ key: 'permission', label: 'Permission', type: 'select', options: ['Administrator','ManageMessages','ManageRoles','ManageChannels','KickMembers','BanMembers','ModerateMembers','ManageNicknames'] }] },
  { id: 'isBot', label: 'User is a bot', icon: '🤖', fields: [] },
  { id: 'isOwner', label: 'User is server owner', icon: '👑', fields: [] },
  { id: 'inChannel', label: 'Used in channel', icon: '#️⃣', fields: [{ key: 'channelId', label: 'Channel ID', type: 'text', placeholder: 'Channel ID' }] },
  { id: 'notInChannel', label: 'NOT in channel', icon: '🚷', fields: [{ key: 'channelId', label: 'Channel ID', type: 'text', placeholder: 'Channel ID' }] },
  { id: 'messageContains', label: 'Message contains word', icon: '💬', fields: [{ key: 'word', label: 'Word/Phrase', type: 'text', placeholder: 'word or phrase' }] },
  { id: 'messageStartsWith', label: 'Message starts with', icon: '📝', fields: [{ key: 'word', label: 'Prefix', type: 'text', placeholder: 'text...' }] },
  { id: 'messageLength', label: 'Message length >', icon: '📏', fields: [{ key: 'length', label: 'Min Length', type: 'text', placeholder: '100' }] },
  { id: 'userIdEquals', label: 'User ID equals', icon: '🆔', fields: [{ key: 'userId', label: 'User ID', type: 'text', placeholder: 'User ID' }] },
  { id: 'mentionsUser', label: 'Message mentions a user', icon: '📢', fields: [] },
  { id: 'hasAttachment', label: 'Message has attachment', icon: '📎', fields: [] },
  { id: 'randomChance', label: 'Random chance (%)', icon: '🎲', fields: [{ key: 'chance', label: 'Chance %', type: 'text', placeholder: '50' }] },
  { id: 'cooldownReady', label: 'Cooldown is ready', icon: '⏱️', fields: [{ key: 'seconds', label: 'Seconds', type: 'text', placeholder: '30' }] },
  { id: 'inVoiceChannel', label: 'User is in voice channel', icon: '🎙️', fields: [] },
  { id: 'serverBooster', label: 'User is server booster', icon: '💎', fields: [] },
  { id: 'accountAge', label: 'Account age > (days)', icon: '📅', fields: [{ key: 'days', label: 'Days', type: 'text', placeholder: '30' }] },
];

const ACTION_TYPES = [
  { id: 'sendMessage', label: 'Send message', icon: '💬', fields: [{ key: 'content', label: 'Message', type: 'textarea', placeholder: 'Use {variables}...' }] },
  { id: 'sendEmbed', label: 'Send embed', icon: '📦', fields: [{ key: 'title', label: 'Title', type: 'text', placeholder: 'Embed title' }, { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Embed body...' }, { key: 'color', label: 'Color', type: 'text', placeholder: '#ff7814' }] },
  { id: 'replyMessage', label: 'Reply to user', icon: '↩️', fields: [{ key: 'content', label: 'Reply', type: 'textarea', placeholder: 'Reply text...' }] },
  { id: 'deleteMessage', label: 'Delete trigger message', icon: '🗑️', fields: [] },
  { id: 'addRole', label: 'Add role to user', icon: '➕', fields: [{ key: 'roleId', label: 'Role ID', type: 'text', placeholder: 'Role ID' }] },
  { id: 'removeRole', label: 'Remove role from user', icon: '➖', fields: [{ key: 'roleId', label: 'Role ID', type: 'text', placeholder: 'Role ID' }] },
  { id: 'sendDM', label: 'Send DM to user', icon: '📩', fields: [{ key: 'content', label: 'DM Message', type: 'textarea', placeholder: 'DM text...' }] },
  { id: 'kickUser', label: 'Kick user', icon: '🦶', fields: [{ key: 'reason', label: 'Reason', type: 'text', placeholder: 'Reason...' }] },
  { id: 'banUser', label: 'Ban user', icon: '🔨', fields: [{ key: 'reason', label: 'Reason', type: 'text', placeholder: 'Reason...' }] },
  { id: 'timeoutUser', label: 'Timeout user', icon: '⏰', fields: [{ key: 'duration', label: 'Duration (e.g. 10m)', type: 'text', placeholder: '10m' }] },
  { id: 'sendToChannel', label: 'Send to specific channel', icon: '📤', fields: [{ key: 'channelId', label: 'Channel ID', type: 'text', placeholder: 'Channel ID' }, { key: 'content', label: 'Message', type: 'textarea', placeholder: 'Message...' }] },
  { id: 'addReaction', label: 'Add reaction', icon: '😀', fields: [{ key: 'emoji', label: 'Emoji', type: 'text', placeholder: '✅ or emoji name' }] },
  { id: 'setVariable', label: 'Set variable', icon: '📋', fields: [{ key: 'varName', label: 'Variable name', type: 'text', placeholder: 'myVar' }, { key: 'varValue', label: 'Value', type: 'text', placeholder: '{author} or text' }] },
  { id: 'wait', label: 'Wait (delay)', icon: '⏳', fields: [{ key: 'ms', label: 'Milliseconds', type: 'text', placeholder: '2000' }] },
  { id: 'log', label: 'Log to channel', icon: '📋', fields: [{ key: 'channelId', label: 'Log Channel ID', type: 'text', placeholder: 'Channel ID' }, { key: 'content', label: 'Log message', type: 'textarea', placeholder: '{author} used command...' }] },
  { id: 'createThread', label: 'Create thread', icon: '🧵', fields: [{ key: 'name', label: 'Thread name', type: 'text', placeholder: '{author}-thread' }] },
  { id: 'sendEmbedAdvanced', label: 'Send advanced embed', icon: '🎨', fields: [{ key: 'title', label: 'Title', type: 'text' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'color', label: 'Color', type: 'text', placeholder: '#ff7814' }, { key: 'thumbnail', label: 'Thumbnail URL', type: 'text' }, { key: 'image', label: 'Image URL', type: 'text' }, { key: 'footer', label: 'Footer', type: 'text' }] },
];

const LOGIC_VARIABLES = [
  { name: '{author}', desc: 'Command user tag' },
  { name: '{author.id}', desc: 'Command user ID' },
  { name: '{author.mention}', desc: 'Mention the user' },
  { name: '{author.avatar}', desc: 'User avatar URL' },
  { name: '{author.name}', desc: 'Username only' },
  { name: '{target}', desc: 'Mentioned user tag' },
  { name: '{target.id}', desc: 'Mentioned user ID' },
  { name: '{target.mention}', desc: 'Mention target' },
  { name: '{server}', desc: 'Server name' },
  { name: '{server.id}', desc: 'Server ID' },
  { name: '{server.members}', desc: 'Member count' },
  { name: '{server.icon}', desc: 'Server icon URL' },
  { name: '{channel}', desc: 'Channel name' },
  { name: '{channel.id}', desc: 'Channel ID' },
  { name: '{channel.mention}', desc: 'Channel mention' },
  { name: '{message}', desc: 'Full message text' },
  { name: '{args}', desc: 'All arguments' },
  { name: '{args.0}', desc: 'First argument' },
  { name: '{args.1}', desc: 'Second argument' },
  { name: '{args.2}', desc: 'Third argument' },
  { name: '{random.1-100}', desc: 'Random number 1-100' },
  { name: '{date}', desc: 'Current date' },
  { name: '{time}', desc: 'Current time' },
  { name: '{timestamp}', desc: 'Unix timestamp' },
  { name: '{prefix}', desc: 'Bot prefix' },
  { name: '{bot.name}', desc: 'Bot username' },
  { name: '{bot.avatar}', desc: 'Bot avatar URL' },
  { name: '{membercount}', desc: 'Server member count' },
  { name: '{roles}', desc: 'User role list' },
];

function renderLogicEditor() {
  const cmd = commands.find(c => c.uid === selectedCommandId);
  if (!cmd) return;
  if (!cmd.logic) cmd.logic = { conditions: [], actions: [], elseActions: [], variables: [] };
  const L = cmd.logic;

  let html = '';

  // ── Conditions ──
  html += `<div class="logic-section">
    <div class="logic-section-header">
      <span class="logic-label logic-if">IF</span>
      <span class="logic-section-title">Conditions</span>
      <span class="logic-hint">${L.conditions.length === 0 ? 'No conditions — command always runs' : L.conditions.length + ' condition(s)'}</span>
    </div>
    <div class="logic-blocks" id="logicConditions">`;
  L.conditions.forEach((cond, i) => {
    const def = CONDITION_TYPES.find(c => c.id === cond.type) || CONDITION_TYPES[0];
    html += renderLogicBlock('condition', cond, i, def, L.conditions.length);
  });
  html += `</div>
    <button class="logic-add-btn" data-add="condition">+ Add Condition</button>
  </div>`;

  // ── Actions ──
  html += `<div class="logic-section">
    <div class="logic-section-header">
      <span class="logic-label logic-then">THEN</span>
      <span class="logic-section-title">Actions</span>
    </div>
    <div class="logic-blocks" id="logicActions">`;
  L.actions.forEach((act, i) => {
    const def = ACTION_TYPES.find(a => a.id === act.type) || ACTION_TYPES[0];
    html += renderLogicBlock('action', act, i, def, L.actions.length);
  });
  html += `</div>
    <button class="logic-add-btn" data-add="action">+ Add Action</button>
  </div>`;

  // ── Else Actions ──
  html += `<div class="logic-section">
    <div class="logic-section-header">
      <span class="logic-label logic-else">ELSE</span>
      <span class="logic-section-title">Else Actions</span>
      <span class="logic-hint">Runs when conditions fail</span>
    </div>
    <div class="logic-blocks" id="logicElse">`;
  L.elseActions.forEach((act, i) => {
    const def = ACTION_TYPES.find(a => a.id === act.type) || ACTION_TYPES[0];
    html += renderLogicBlock('else', act, i, def, L.elseActions.length);
  });
  html += `</div>
    <button class="logic-add-btn" data-add="else">+ Add Else Action</button>
  </div>`;

  // ── Variables ──
  html += `<div class="logic-section">
    <div class="logic-section-header">
      <span class="logic-label logic-var">VAR</span>
      <span class="logic-section-title">Variables</span>
    </div>
    <div class="logic-vars-grid">`;
  LOGIC_VARIABLES.forEach(v => {
    html += `<div class="logic-var-pill" data-var="${v.name}" title="${v.desc}"><code>${v.name}</code><span class="logic-var-desc">${v.desc}</span></div>`;
  });
  html += `</div>`;
  // Custom variables
  html += `<div class="logic-custom-vars">
    <div class="logic-subsection-title">Custom Variables</div>`;
  L.variables.forEach((v, i) => {
    html += `<div class="logic-custom-var-row">
      <input type="text" class="logic-input sm" value="${escHtml(v.name)}" data-cvar-name="${i}" placeholder="name" />
      <span class="logic-eq">=</span>
      <input type="text" class="logic-input" value="${escHtml(v.value)}" data-cvar-value="${i}" placeholder="value or {variable}" />
      <button class="logic-remove-btn" data-remove-cvar="${i}">×</button>
    </div>`;
  });
  html += `<button class="logic-add-btn sm" data-add="variable">+ Add Variable</button>
  </div></div>`;

  editorLogic.innerHTML = html;
  bindLogicEvents(cmd);
}

function renderLogicBlock(group, block, index, def, total) {
  const isCondition = group === 'condition';
  const types = isCondition ? CONDITION_TYPES : ACTION_TYPES;
  const connector = isCondition ? (index === 0 ? 'IF' : 'AND') : (group === 'else' ? 'ELSE' : 'THEN');
  const connectorClass = isCondition ? 'logic-if' : (group === 'else' ? 'logic-else' : 'logic-then');

  let html = `<div class="logic-block" data-group="${group}" data-index="${index}">
    <div class="logic-block-header">
      <span class="logic-connector ${connectorClass}">${connector}</span>
      <select class="logic-type-select" data-group="${group}" data-index="${index}">
        ${types.map(t => `<option value="${t.id}" ${block.type === t.id ? 'selected' : ''}>${t.icon} ${t.label}</option>`).join('')}
      </select>
      <div class="logic-block-actions">`;
  if (index > 0) html += `<button class="logic-move-btn" data-move="up" data-group="${group}" data-index="${index}" title="Move up">↑</button>`;
  if (index < total - 1) html += `<button class="logic-move-btn" data-move="down" data-group="${group}" data-index="${index}" title="Move down">↓</button>`;
  html += `<button class="logic-remove-btn" data-remove="${group}" data-index="${index}" title="Remove">×</button>
      </div>
    </div>`;

  // Render fields for this block's type
  if (def.fields.length > 0) {
    html += `<div class="logic-block-fields">`;
    def.fields.forEach(f => {
      const val = block[f.key] || '';
      if (f.type === 'text') {
        html += `<div class="logic-field"><label>${f.label}</label><input type="text" class="logic-input" data-group="${group}" data-index="${index}" data-key="${f.key}" value="${escHtml(val)}" placeholder="${f.placeholder || ''}" /></div>`;
      } else if (f.type === 'textarea') {
        html += `<div class="logic-field"><label>${f.label}</label><textarea class="logic-input" data-group="${group}" data-index="${index}" data-key="${f.key}" rows="2" placeholder="${f.placeholder || ''}">${escHtml(val)}</textarea></div>`;
      } else if (f.type === 'select') {
        html += `<div class="logic-field"><label>${f.label}</label><select class="logic-input" data-group="${group}" data-index="${index}" data-key="${f.key}">${f.options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
      }
    });
    html += `</div>`;
  }
  html += `</div>`;
  return html;
}

function bindLogicEvents(cmd) {
  const L = cmd.logic;

  // Add buttons
  editorLogic.querySelectorAll('.logic-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.add;
      if (type === 'condition') {
        L.conditions.push({ type: 'hasRole', roleId: '' });
      } else if (type === 'action') {
        L.actions.push({ type: 'sendMessage', content: '' });
      } else if (type === 'else') {
        L.elseActions.push({ type: 'sendMessage', content: '' });
      } else if (type === 'variable') {
        L.variables.push({ name: '', value: '' });
      }
      renderLogicEditor();
      scheduleAutoSave();
    });
  });

  // Remove buttons
  editorLogic.querySelectorAll('.logic-remove-btn[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.remove;
      const idx = parseInt(btn.dataset.index);
      if (group === 'condition') L.conditions.splice(idx, 1);
      else if (group === 'action') L.actions.splice(idx, 1);
      else if (group === 'else') L.elseActions.splice(idx, 1);
      renderLogicEditor();
      scheduleAutoSave();
    });
  });

  // Remove custom variable
  editorLogic.querySelectorAll('[data-remove-cvar]').forEach(btn => {
    btn.addEventListener('click', () => {
      L.variables.splice(parseInt(btn.dataset.removeCvar), 1);
      renderLogicEditor();
      scheduleAutoSave();
    });
  });

  // Move buttons
  editorLogic.querySelectorAll('.logic-move-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.dataset.group;
      const idx = parseInt(btn.dataset.index);
      const dir = btn.dataset.move === 'up' ? -1 : 1;
      const arr = group === 'condition' ? L.conditions : group === 'action' ? L.actions : L.elseActions;
      if (idx + dir >= 0 && idx + dir < arr.length) {
        [arr[idx], arr[idx + dir]] = [arr[idx + dir], arr[idx]];
        renderLogicEditor();
        scheduleAutoSave();
      }
    });
  });

  // Type selectors
  editorLogic.querySelectorAll('.logic-type-select').forEach(sel => {
    sel.addEventListener('change', () => {
      const group = sel.dataset.group;
      const idx = parseInt(sel.dataset.index);
      const arr = group === 'condition' ? L.conditions : group === 'action' ? L.actions : L.elseActions;
      const newType = sel.value;
      arr[idx] = { type: newType };
      renderLogicEditor();
      scheduleAutoSave();
    });
  });

  // Field inputs
  editorLogic.querySelectorAll('.logic-input[data-group]').forEach(input => {
    const update = () => {
      const group = input.dataset.group;
      const idx = parseInt(input.dataset.index);
      const key = input.dataset.key;
      const arr = group === 'condition' ? L.conditions : group === 'action' ? L.actions : L.elseActions;
      if (arr[idx]) arr[idx][key] = input.value;
      scheduleAutoSave();
    };
    input.addEventListener('input', update);
    input.addEventListener('change', update);
  });

  // Custom variable inputs
  editorLogic.querySelectorAll('[data-cvar-name]').forEach(input => {
    input.addEventListener('input', () => { L.variables[parseInt(input.dataset.cvarName)].name = input.value; scheduleAutoSave(); });
  });
  editorLogic.querySelectorAll('[data-cvar-value]').forEach(input => {
    input.addEventListener('input', () => { L.variables[parseInt(input.dataset.cvarValue)].value = input.value; scheduleAutoSave(); });
  });

  // Variable pills — click to copy
  editorLogic.querySelectorAll('.logic-var-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      navigator.clipboard.writeText(pill.dataset.var);
      toast('Copied: ' + pill.dataset.var, 'success');
    });
  });
}

// ─── Logic Code Generation ───
function generateLogicVarResolver(prefix) {
  return `${prefix}const __vars = {};
${prefix}const __resolveVar = (str) => {
${prefix}  return str
${prefix}    .replace(/{author}/g, message.author.tag)
${prefix}    .replace(/{author\\.id}/g, message.author.id)
${prefix}    .replace(/{author\\.mention}/g, \`<@\${message.author.id}>\`)
${prefix}    .replace(/{author\\.avatar}/g, message.author.displayAvatarURL())
${prefix}    .replace(/{author\\.name}/g, message.author.username)
${prefix}    .replace(/{target}/g, message.mentions?.users?.first()?.tag || 'nobody')
${prefix}    .replace(/{target\\.id}/g, message.mentions?.users?.first()?.id || '')
${prefix}    .replace(/{target\\.mention}/g, message.mentions?.users?.first() ? \`<@\${message.mentions.users.first().id}>\` : '')
${prefix}    .replace(/{server}/g, message.guild.name)
${prefix}    .replace(/{server\\.id}/g, message.guild.id)
${prefix}    .replace(/{server\\.members}/g, message.guild.memberCount)
${prefix}    .replace(/{server\\.icon}/g, message.guild.iconURL() || '')
${prefix}    .replace(/{channel}/g, message.channel.name)
${prefix}    .replace(/{channel\\.id}/g, message.channel.id)
${prefix}    .replace(/{channel\\.mention}/g, \`<#\${message.channel.id}>\`)
${prefix}    .replace(/{message}/g, message.content)
${prefix}    .replace(/{args}/g, args.join(' '))
${prefix}    .replace(/{args\\.0}/g, args[0] || '')
${prefix}    .replace(/{args\\.1}/g, args[1] || '')
${prefix}    .replace(/{args\\.2}/g, args[2] || '')
${prefix}    .replace(/{random\\.1-100}/g, Math.floor(Math.random() * 100) + 1)
${prefix}    .replace(/{date}/g, new Date().toLocaleDateString())
${prefix}    .replace(/{time}/g, new Date().toLocaleTimeString())
${prefix}    .replace(/{timestamp}/g, Math.floor(Date.now() / 1000))
${prefix}    .replace(/{prefix}/g, typeof PREFIX !== 'undefined' ? PREFIX : '/')
${prefix}    .replace(/{bot\\.name}/g, client.user.tag)
${prefix}    .replace(/{bot\\.avatar}/g, client.user.displayAvatarURL())
${prefix}    .replace(/{membercount}/g, message.guild.memberCount)
${prefix}    .replace(/{roles}/g, message.member?.roles?.cache?.map(r => r.name).join(', ') || '')
${prefix}    .replace(/\\{(\\w+)\\}/g, (m, k) => __vars[k] !== undefined ? __vars[k] : m);
${prefix}};\n`;
}

function generateConditionCode(cond, indent) {
  const p = indent;
  switch (cond.type) {
    case 'hasRole': return `message.member.roles.cache.has('${cond.roleId}')`;
    case 'notHasRole': return `!message.member.roles.cache.has('${cond.roleId}')`;
    case 'hasPermission': return `message.member.permissions.has(PermissionFlagsBits.${cond.permission || 'Administrator'})`;
    case 'isBot': return `message.author.bot`;
    case 'isOwner': return `message.guild.ownerId === message.author.id`;
    case 'inChannel': return `message.channel.id === '${cond.channelId}'`;
    case 'notInChannel': return `message.channel.id !== '${cond.channelId}'`;
    case 'messageContains': return `message.content.toLowerCase().includes('${(cond.word || '').toLowerCase().replace(/'/g, "\\'")}')`;
    case 'messageStartsWith': return `message.content.toLowerCase().startsWith('${(cond.word || '').toLowerCase().replace(/'/g, "\\'")}')`;
    case 'messageLength': return `message.content.length > ${parseInt(cond.length) || 100}`;
    case 'userIdEquals': return `message.author.id === '${cond.userId}'`;
    case 'mentionsUser': return `message.mentions.users.size > 0`;
    case 'hasAttachment': return `message.attachments.size > 0`;
    case 'randomChance': return `Math.random() * 100 < ${parseInt(cond.chance) || 50}`;
    case 'cooldownReady': return `!cooldowns.has(\`logic-\${message.author.id}\`)`;
    case 'inVoiceChannel': return `!!message.member.voice.channel`;
    case 'serverBooster': return `!!message.member.premiumSince`;
    case 'accountAge': return `(Date.now() - message.author.createdTimestamp) > ${(parseInt(cond.days) || 30) * 86400000}`;
    default: return 'true';
  }
}

function generateActionCode(action, indent) {
  const p = indent;
  switch (action.type) {
    case 'sendMessage': return `${p}message.channel.send(__resolveVar(\`${(action.content || '').replace(/`/g, '\\`')}\`));\n`;
    case 'sendEmbed': return `${p}message.channel.send({ embeds: [new EmbedBuilder().setTitle(__resolveVar(\`${(action.title || '').replace(/`/g, '\\`')}\`)).setDescription(__resolveVar(\`${(action.description || '').replace(/`/g, '\\`')}\`)).setColor('${action.color || '#ff7814'}').setTimestamp()] });\n`;
    case 'replyMessage': return `${p}message.reply(__resolveVar(\`${(action.content || '').replace(/`/g, '\\`')}\`));\n`;
    case 'deleteMessage': return `${p}try { await message.delete(); } catch(e) {}\n`;
    case 'addRole': return `${p}try { await message.member.roles.add('${action.roleId}'); } catch(e) {}\n`;
    case 'removeRole': return `${p}try { await message.member.roles.remove('${action.roleId}'); } catch(e) {}\n`;
    case 'sendDM': return `${p}try { await message.author.send(__resolveVar(\`${(action.content || '').replace(/`/g, '\\`')}\`)); } catch(e) {}\n`;
    case 'kickUser': return `${p}try { await message.member.kick(__resolveVar(\`${(action.reason || 'No reason').replace(/`/g, '\\`')}\`)); } catch(e) {}\n`;
    case 'banUser': return `${p}try { await message.member.ban({ reason: __resolveVar(\`${(action.reason || 'No reason').replace(/`/g, '\\`')}\`) }); } catch(e) {}\n`;
    case 'timeoutUser': return `${p}try { await message.member.timeout(parseDuration('${action.duration || '10m'}') || 600000, 'Logic timeout'); } catch(e) {}\n`;
    case 'sendToChannel': return `${p}{ const __ch = message.guild.channels.cache.get('${action.channelId}'); if (__ch) __ch.send(__resolveVar(\`${(action.content || '').replace(/`/g, '\\`')}\`)); }\n`;
    case 'addReaction': return `${p}try { await message.react('${action.emoji || '✅'}'); } catch(e) {}\n`;
    case 'setVariable': return `${p}__vars['${action.varName || 'temp'}'] = __resolveVar(\`${(action.varValue || '').replace(/`/g, '\\`')}\`);\n`;
    case 'wait': return `${p}await new Promise(r => setTimeout(r, ${parseInt(action.ms) || 1000}));\n`;
    case 'log': return `${p}{ const __logCh = message.guild.channels.cache.get('${action.channelId}'); if (__logCh) __logCh.send(__resolveVar(\`${(action.content || '').replace(/`/g, '\\`')}\`)); }\n`;
    case 'createThread': return `${p}try { await message.startThread({ name: __resolveVar(\`${(action.name || 'Thread').replace(/`/g, '\\`')}\`), autoArchiveDuration: 60 }); } catch(e) {}\n`;
    case 'sendEmbedAdvanced': {
      let code = `${p}{ const __emb = new EmbedBuilder()`;
      if (action.title) code += `.setTitle(__resolveVar(\`${action.title.replace(/`/g, '\\`')}\`))`;
      if (action.description) code += `.setDescription(__resolveVar(\`${action.description.replace(/`/g, '\\`')}\`))`;
      code += `.setColor('${action.color || '#ff7814'}')`;
      if (action.thumbnail) code += `.setThumbnail(__resolveVar(\`${action.thumbnail.replace(/`/g, '\\`')}\`))`;
      if (action.image) code += `.setImage(__resolveVar(\`${action.image.replace(/`/g, '\\`')}\`))`;
      if (action.footer) code += `.setFooter({ text: __resolveVar(\`${action.footer.replace(/`/g, '\\`')}\`) })`;
      code += `.setTimestamp();\n${p}message.channel.send({ embeds: [__emb] }); }\n`;
      return code;
    }
    default: return '';
  }
}

function generateLogicCode(cmd) {
  const L = cmd.logic;
  if (!L || (L.conditions.length === 0 && L.actions.length === 0 && L.elseActions.length === 0)) return '';

  const indent = '    ';
  let code = `    // ── Custom Logic ──\n`;
  code += generateLogicVarResolver(indent);

  // Set custom variables
  if (L.variables && L.variables.length) {
    L.variables.forEach(v => {
      if (v.name && v.value) {
        code += `${indent}__vars['${v.name}'] = __resolveVar(\`${v.value.replace(/`/g, '\\`')}\`);\n`;
      }
    });
  }

  if (L.conditions.length > 0) {
    const condParts = L.conditions.map(c => generateConditionCode(c, indent));
    code += `${indent}if (${condParts.join(' && ')}) {\n`;
    L.actions.forEach(a => { code += generateActionCode(a, indent + '  '); });
    if (L.elseActions.length > 0) {
      code += `${indent}} else {\n`;
      L.elseActions.forEach(a => { code += generateActionCode(a, indent + '  '); });
    }
    code += `${indent}}\n`;
  } else {
    // No conditions — just run actions
    L.actions.forEach(a => { code += generateActionCode(a, indent); });
  }

  // Cooldown set if any cooldownReady condition exists
  const cooldownCond = L.conditions.find(c => c.type === 'cooldownReady');
  if (cooldownCond) {
    const secs = parseInt(cooldownCond.seconds) || 30;
    code += `${indent}cooldowns.set(\`logic-\${message.author.id}\`, true);\n`;
    code += `${indent}setTimeout(() => cooldowns.delete(\`logic-\${message.author.id}\`), ${secs * 1000});\n`;
  }

  return code;
}

// ─── Slash Command Helpers ───
function getSlashOptions(cmd) {
  const t = cmd.templateId;
  const opts = [];
  // Commands that need a target user
  const needsUser = ['kick','ban','mute','unmute','warn','softban','voicekick','voicemute','voicedeafen',
    'clearwarns','warncount','jail','unjail','tempban','nickname','addrole','removerole','modnote',
    'userinfo','avatar','banner','whois','perms','ship','hug','slap','pat','kiss','poke','bite','highfive',
    'fight','marry','divorce','gayrate','simprate','iqtest','howcute','balance','report','pp'];
  // Commands that need a text/string argument
  const needsText = ['say','announce','embedsay','embedcmd','suggest','8ball','rate','choose','mock',
    'uwuify','ascii','emojify','clap','reverse','binary','hex','base64','afk','reminder','calc',
    'timestamp','colorinfo','nickname-self','steal','enlarge','colorrole','poll'];
  // Commands that need an amount/number
  const needsNumber = ['clear','slowmode','countdown','roll'];
  // Commands that need a reason string
  const needsReason = ['kick','ban','mute','warn','softban','tempban'];
  // Commands that need a role
  const needsRole = ['roleinfo','whohas','massrole','selfrole'];

  if (needsUser.includes(t)) opts.push({ name: 'user', desc: 'Target user', type: 'User', required: !['balance','gayrate','simprate','iqtest','howcute','warncount','pp','userinfo','avatar','banner','whois','perms'].includes(t) });
  if (needsRole.includes(t)) opts.push({ name: 'role', desc: 'Target role', type: 'Role', required: true });
  if (needsText.includes(t)) opts.push({ name: 'text', desc: 'Text input', type: 'String', required: !['afk'].includes(t) });
  if (needsNumber.includes(t)) opts.push({ name: 'amount', desc: 'Number', type: 'Integer', required: !['roll'].includes(t) });
  if (needsReason.includes(t)) opts.push({ name: 'reason', desc: 'Reason', type: 'String', required: false });
  if (t === 'tempban') opts.push({ name: 'duration', desc: 'Duration (e.g. 1h, 1d)', type: 'String', required: false });
  if (t === 'giveaway') {
    opts.push({ name: 'prize', desc: 'What to give away', type: 'String', required: true });
    opts.push({ name: 'duration', desc: 'Duration', type: 'String', required: true });
  }
  if (t === 'ship') opts.push({ name: 'user2', desc: 'Second user', type: 'User', required: false });
  return opts;
}

function generateSlashRegistration(messageCmds, token) {
  let code = `\n// ── Slash Command Definitions ──\nconst slashCommands = [\n`;
  messageCmds.forEach(cmd => {
    const f = cmd.fields;
    const opts = getSlashOptions(cmd);
    const desc = (cmd.description || 'No description').replace(/'/g, "\\'").slice(0, 100);
    code += `  new SlashCommandBuilder().setName('${f.commandName}').setDescription('${desc}')`;
    opts.forEach(o => {
      const reqStr = o.required ? 'o.setRequired(true)' : 'o';
      code += `.add${o.type}Option(o => ${reqStr}.setName('${o.name}').setDescription('${o.desc.replace(/'/g, "\\'")}'))`;
    });
    code += `.toJSON(),\n`;
  });
  code += `];\n\n`;
  return code;
}

function generateSlashHandler(messageCmds, hasCooldown, prefix) {
  let code = `// ── Slash Command Handler ──
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  const message = interaction; // compatibility alias
  const args = [];\n`;

  // Build args from options for compatibility with existing generators
  code += `  // Build args from slash options for prefix-code compatibility
  const userOpt = interaction.options.getUser('user');
  const textOpt = interaction.options.getString('text');
  const amountOpt = interaction.options.getInteger('amount');
  const reasonOpt = interaction.options.getString('reason');
  const roleOpt = interaction.options.getRole('role');
  if (userOpt) args.push(userOpt.toString());
  if (textOpt) args.push(...textOpt.split(' '));
  if (amountOpt !== null && amountOpt !== undefined) args.push(String(amountOpt));
  if (reasonOpt) args.push(...reasonOpt.split(' '));\n\n`;

  if (hasCooldown) {
    code += `  const cdKey = \`\${commandName}-\${interaction.user.id}\`;
  if (cooldowns.has(cdKey)) {
    const remaining = ((cooldowns.get(cdKey) - Date.now()) / 1000).toFixed(1);
    if (remaining > 0) return interaction.reply({ content: \`⏳ Please wait \${remaining}s before using this command again.\`, ephemeral: true });
  }\n\n`;
  }

  code += `  // Slash-to-prefix compatibility shim
  const fakeMessage = {
    author: interaction.user,
    member: interaction.member,
    guild: interaction.guild,
    channel: interaction.channel,
    mentions: {
      users: new Map(${`userOpt ? [[userOpt.id, userOpt]] : []`}),
      members: new Map(${`interaction.options.getMember?.('user') ? [[interaction.options.getMember('user').id, interaction.options.getMember('user')]] : []`}),
      roles: new Map(${`roleOpt ? [[roleOpt.id, roleOpt]] : []`})
    },
    content: \`/${`\${commandName} \${args.join(' ')}`}\`,
    reply: (c) => interaction.reply(typeof c === 'string' ? { content: c } : c),
    delete: () => Promise.resolve()
  };
  fakeMessage.mentions.users.first = () => userOpt || undefined;
  fakeMessage.mentions.members.first = () => interaction.options.getMember?.('user') || undefined;
  fakeMessage.mentions.roles.first = () => roleOpt || undefined;\n\n`;

  // Override message.channel.send to use interaction.reply/followUp
  code += `  let hasReplied = false;
  const origChannel = interaction.channel;
  const safeReply = async (content) => {
    if (!hasReplied) { hasReplied = true; return interaction.reply(typeof content === 'string' ? { content } : content); }
    return interaction.followUp(typeof content === 'string' ? { content } : content);
  };
  const fakeChannel = { ...origChannel, send: safeReply };\n\n`;

  messageCmds.forEach((cmd, i) => {
    const f = cmd.fields;
    const ifWord = i === 0 ? 'if' : 'else if';
    code += `  ${ifWord} (commandName === '${f.commandName}') {\n`;
    if (f.requirePermission) {
      code += `    if (!interaction.member.permissions.has(PermissionFlagsBits.${f.requirePermission})) return interaction.reply({ content: \`${f.errorNoPerms || '❌ No permission.'}\`, ephemeral: true });\n`;
    }
    if (hasCooldown && parseInt(f.cooldown) > 0) {
      code += `    cooldowns.set(cdKey, Date.now() + ${parseInt(f.cooldown) * 1000});\n`;
      code += `    setTimeout(() => cooldowns.delete(cdKey), ${parseInt(f.cooldown) * 1000});\n`;
    }
    // Use a simplified approach — call interaction.reply with the generated response
    code += generateSlashCommandBody(cmd, f);
    code += `  }\n`;
  });

  code += `});\n\n`;
  return code;
}

function generateSlashCommandBody(cmd, f) {
  const t = cmd.templateId;
  // Simple text-response commands
  const simpleReply = (text) => `    await safeReply(${text});\n`;

  // Permission-gated target commands
  const targetUser = `interaction.options.getUser('user')`;
  const targetMember = `interaction.options.getMember('user')`;
  const textInput = `interaction.options.getString('text')`;
  const amountInput = `interaction.options.getInteger('amount')`;
  const reasonInput = `interaction.options.getString('reason') || 'No reason provided'`;

  switch (t) {
    case 'kick': return `    const target = ${targetMember};
    if (!target) return safeReply('❌ User not found.');
    if (!target.kickable) return safeReply('❌ I cannot kick this user.');
    const reason = ${reasonInput};
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, interaction.guild.name).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    await target.kick(reason);
    ${f.successEmbed ? `await safeReply({ embeds: [new EmbedBuilder().setDescription(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason)).setColor('${f.embedColor || '#ff7814'}')] });` : `await safeReply(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason));`}\n`;

    case 'ban': return `    const target = ${targetMember};
    if (!target) return safeReply('❌ User not found.');
    if (!target.bannable) return safeReply('❌ I cannot ban this user.');
    const reason = ${reasonInput};
    ${f.sendDM ? `try { await target.send(\`${f.dmMessage}\`.replace(/{server}/g, interaction.guild.name).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason)); } catch(e) {}` : ''}
    await target.ban({ deleteMessageDays: ${f.deleteDays || 0}, reason });
    ${f.successEmbed ? `await safeReply({ embeds: [new EmbedBuilder().setDescription(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason)).setColor('${f.embedColor || '#ff7814'}')] });` : `await safeReply(\`${f.response}\`.replace(/{target}/g, target.user.tag).replace(/{author}/g, interaction.user.tag).replace(/{reason}/g, reason));`}\n`;

    case 'ping': return `    const latency = Date.now() - interaction.createdTimestamp;
    ${f.successEmbed ? `await safeReply({ embeds: [new EmbedBuilder().setTitle('🏓 Pong!').addFields({name:'Latency',value:\`\${latency}ms\`,inline:true},{name:'API',value:\`\${client.ws.ping}ms\`,inline:true}).setColor('${f.embedColor || '#ff7814'}')] });` : `await safeReply(\`🏓 Pong! Latency: \${latency}ms | API: \${client.ws.ping}ms\`);`}\n`;

    default:
      // Fallback: use a compatibility wrapper that adapts prefix code to slash
      return `    // Compatibility wrapper for slash command
    const message = fakeMessage;
    message.channel = fakeChannel;
    try {
${generatePrefixCodeForTemplate(cmd, f)}
    } catch(e) { await safeReply('❌ An error occurred: ' + e.message); }\n`;
  }
}

function generatePrefixCodeForTemplate(cmd, f) {
  // Delegate to the same generators used by prefix commands
  // These generators use message.channel.send / message.reply which our shim intercepts
  let body = '';
  switch (cmd.templateId) {
    case 'kick': body = generateKickCode(f); break;
    case 'ban': body = generateBanCode(f); break;
    case 'mute': body = generateMuteCode(f); break;
    case 'unmute': body = generateUnmuteCode(f); break;
    case 'warn': body = generateWarnCode(f); break;
    case 'clear': body = generateClearCode(f); break;
    case 'userinfo': body = generateUserInfoCode(f); break;
    case 'serverinfo': body = generateServerInfoCode(f); break;
    case 'help': body = generateHelpCode(f, '/', [{fields:{commandName:'help'}}]); break;
    case 'say': body = generateSayCode(f); break;
    case 'announce': body = generateAnnounceCode(f); break;
    case 'poll': body = generatePollCode(f); break;
    case 'giveaway': body = generateGiveawayCode(f); break;
    case 'ticket': body = generateTicketCode(f); break;
    case 'avatar': body = generateAvatarCode(f); break;
    case 'slowmode': body = generateSlowmodeCode(f); break;
    case 'lock': body = generateLockCode(f); break;
    case 'unlock': body = generateUnlockCode(f); break;
    case 'unban': body = generateUnbanCode(f); break;
    case 'snipe': body = generateSnipeCode(f); break;
    case '8ball': body = generate8BallCode(f); break;
    case 'coinflip': body = generateCoinflipCode(f); break;
    case 'roll': body = generateRollCode(f); break;
    case 'afk': body = generateAfkCode(f); break;
    case 'roleinfo': body = generateRoleInfoCode(f); break;
    case 'nickname': body = generateNicknameCode(f); break;
    case 'embedcmd': body = generateEmbedCmdCode(f); break;
    case 'report': body = generateReportCode(f); break;
    case 'suggest': body = generateSuggestCode(f); break;
    case 'rps': body = generateRpsCode(f); break;
    case 'trivia': body = generateTriviaCode(f); break;
    case 'addrole': body = generateAddRoleCode(f); break;
    case 'removerole': body = generateRemoveRoleCode(f); break;
    case 'reminder': body = generateReminderCode(f); break;
    case 'banner': body = generateBannerCode(f); break;
    case 'whois': body = generateWhoisCode(f); break;
    case 'channelinfo': body = generateChannelInfoCode(f); break;
    case 'leaderboard': body = generateLeaderboardCode(f); break;
    case 'softban': body = generateSoftbanCode(f); break;
    case 'nuke': body = generateNukeCode(f); break;
    case 'voicekick': body = generateVoiceActionCode(f, 'disconnect'); break;
    case 'voicemute': body = generateVoiceActionCode(f, 'mute'); break;
    case 'voicedeafen': body = generateVoiceActionCode(f, 'deafen'); break;
    case 'clearwarns': body = generateClearWarnsCode(f); break;
    case 'warncount': body = generateWarnCountCode(f); break;
    case 'jail': case 'unjail': body = generateJailCode(f, cmd.templateId); break;
    case 'tempban': body = generateTempbanCode(f); break;
    case 'hide': body = generateHideCode(f, false); break;
    case 'unhide': body = generateHideCode(f, true); break;
    case 'dehoist': body = generateDehoistCode(f); break;
    case 'modnote': body = generateModNoteCode(f); break;
    case 'massrole': body = generateMassRoleCode(f); break;
    case 'calc': body = generateCalcCode(f); break;
    case 'choose': body = generateChooseCode(f); break;
    case 'rate': body = generateRateCode(f); break;
    case 'uptime': body = generateUptimeCode(f); break;
    case 'invitebot': body = generateInviteBotCode(f); break;
    case 'botinfo': body = generateBotInfoCode(f); break;
    case 'membercount': body = generateMemberCountCode(f); break;
    case 'reverse': body = generateTextTransformCode(f, 'reverse'); break;
    case 'binary': body = generateTextTransformCode(f, 'binary'); break;
    case 'hex': body = generateTextTransformCode(f, 'hex'); break;
    case 'base64': body = generateTextTransformCode(f, 'base64'); break;
    case 'enlarge': body = generateEnlargeCode(f); break;
    case 'servericon': body = generateServerIconCode(f); break;
    case 'rolecount': body = generateSimpleInfoCode(f, 'rolecount'); break;
    case 'channelcount': body = generateSimpleInfoCode(f, 'channelcount'); break;
    case 'firstmsg': body = generateFirstMsgCode(f); break;
    case 'timestamp': body = generateTimestampCode(f); break;
    case 'colorinfo': body = generateColorInfoCode(f); break;
    case 'countdown': body = generateCountdownCode(f); break;
    case 'embedsay': body = generateEmbedSayCode(f); break;
    case 'snipeedit': body = generateEditSnipeCode(f); break;
    case 'steal': body = generateStealCode(f); break;
    case 'afklist': body = generateAfkListCode(f); break;
    case 'remindlist': body = generateRemindListCode(f); break;
    case 'nickname-self': body = generateSelfNickCode(f); break;
    case 'joke': case 'fact': case 'quote': case 'fortune': case 'pickup': case 'dare': case 'truth': case 'paranoia': case 'neverhavei': case 'wyr': case 'tod': case 'meme': case 'roast': case 'compliment':
      body = generateRandomPoolCode(f, cmd.templateId); break;
    case 'ship': body = generateShipCode(f); break;
    case 'hug': case 'slap': case 'pat': case 'kiss': case 'poke': case 'bite': case 'highfive':
      body = generateSocialActionCode(f, cmd.templateId); break;
    case 'wink': case 'dab': case 'cry': case 'laugh': case 'facepalm':
      body = generateEmoteCode(f, cmd.templateId); break;
    case 'tableflip': body = `    message.channel.send('(╯°□°)╯︵ ┻━┻');\n`; break;
    case 'unflip': body = `    message.channel.send('┬─┬ ノ( ゜-゜ノ)');\n`; break;
    case 'numberguess': body = generateNumberGuessCode(f); break;
    case 'slots': body = generateSlotsCode(f); break;
    case 'gayrate': case 'simprate': case 'iqtest': case 'howcute':
      body = generatePercentRateCode(f, cmd.templateId); break;
    case 'mock': body = generateMockCode(f); break;
    case 'uwuify': body = generateUwuCode(f); break;
    case 'ascii': body = generateAsciiCode(f); break;
    case 'emojify': body = generateEmojifyCode(f); break;
    case 'clap': body = generateClapCode(f); break;
    case 'pp': body = generatePPCode(f); break;
    case 'fight': body = generateFightCode(f); break;
    case 'marry': case 'divorce': body = generateMarryCode(f, cmd.templateId); break;
    case 'emojilist': body = generateEmojiListCode(f); break;
    case 'boosters': body = generateBoostersCode(f); break;
    case 'perms': body = generatePermsCode(f); break;
    case 'whohas': body = generateWhoHasCode(f); break;
    case 'roles': body = generateRolesListCode(f); break;
    case 'emotecount': body = generateSimpleInfoCode(f, 'emotecount'); break;
    case 'oldestmember': body = generateMemberSortCode(f, 'oldest'); break;
    case 'newestmember': body = generateMemberSortCode(f, 'newest'); break;
    case 'banlist': body = generateBanListCode(f); break;
    case 'invites': body = generateInvitesCode(f); break;
    case 'botstatus': body = generateBotStatusCode(f); break;
    case 'balance': body = generateBalanceCode(f); break;
    case 'work': body = generateWorkCode(f); break;
    case 'daily': body = generateDailyCode(f); break;
    case 'leaderboard-eco': body = generateEcoLeaderboardCode(f); break;
    case 'selfrole': body = generateSelfRoleCode(f); break;
    case 'colorrole': body = generateColorRoleCode(f); break;
    case 'apply': body = generateApplyCode(f); break;
    default: body = generateCustomCode(f);
  }
  return body;
}

// ─── Auto-Response Helpers ───
function getAutoResponses() {
  return autoResponsesList.filter(ar => ar.trigger.trim() && ar.response.trim());
}

function renderAutoResponses() {
  const container = $('#autoResponsesList');
  if (!container) return;
  container.innerHTML = autoResponsesList.map((ar, i) => `
    <div class="ar-row">
      <input type="text" class="ar-trigger" data-ar-idx="${i}" placeholder="Trigger word/phrase..." value="${escHtml(ar.trigger)}" />
      <input type="text" class="ar-response" data-ar-idx="${i}" placeholder="Bot response..." value="${escHtml(ar.response)}" />
      <label class="toggle-switch toggle-sm" title="Exact match">
        <input type="checkbox" data-ar-exact="${i}" ${ar.exact ? 'checked' : ''} />
        <span class="toggle-slider"></span>
      </label>
      <button class="icon-btn icon-btn-sm" data-ar-remove="${i}" title="Remove">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('.ar-trigger').forEach(inp => {
    inp.addEventListener('input', () => { autoResponsesList[parseInt(inp.dataset.arIdx)].trigger = inp.value; });
  });
  container.querySelectorAll('.ar-response').forEach(inp => {
    inp.addEventListener('input', () => { autoResponsesList[parseInt(inp.dataset.arIdx)].response = inp.value; });
  });
  container.querySelectorAll('[data-ar-exact]').forEach(cb => {
    cb.addEventListener('change', () => { autoResponsesList[parseInt(cb.dataset.arExact)].exact = cb.checked; });
  });
  container.querySelectorAll('[data-ar-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      autoResponsesList.splice(parseInt(btn.dataset.arRemove), 1);
      renderAutoResponses();
    });
  });
}

// ─── Logging Config Helpers ───
function getLogConfig() {
  return {
    msgDelete: $('#logMsgDelete')?.checked || false,
    msgEdit: $('#logMsgEdit')?.checked || false,
    memberJoin: $('#logMemberJoin')?.checked || false,
    memberLeave: $('#logMemberLeave')?.checked || false,
    logChannelId: $('#logChannelId')?.value || ''
  };
}

// ─── Auto-Mod Config Helper ───
function getAutoModConfig() {
  const spam = $('#automodSpam')?.checked || false;
  const links = $('#automodLinks')?.checked || false;
  const caps = $('#automodCaps')?.checked || false;
  const words = $('#automodWords')?.checked || false;
  const massMention = $('#automodMassMention')?.checked || false;
  const invites = $('#automodInvites')?.checked || false;
  const action = $('#automodAction')?.value || 'delete';
  const logChannel = $('#automodLogChannel')?.value || '';
  const exemptRole = $('#automodExemptRole')?.value || '';
  const badWordsRaw = $('#badWordsList')?.value || '';
  const badWordsList = badWordsRaw.split(',').map(w => w.trim()).filter(Boolean);
  const enabled = spam || links || caps || words || massMention || invites;
  return { enabled, antiSpam: spam, antiLinks: links, antiCaps: caps, badWords: words, massMention, antiInvites: invites, action, logChannel, exemptRole, badWordsList };
}

// ─── Save / Load Config ───
async function saveConfig() {
  const config = {
    botName: $('#botName').value,
    prefix: $('#botPrefix').value,
    commandType: $('#commandType')?.value || 'prefix',
    status: $('#botStatus').value,
    activityType: $('#botActivityType')?.value || '0',
    activity: $('#botActivity').value,
    commands: commands,
    automod: getAutoModConfig(),
    autoResponses: autoResponsesList,
    logConfig: getLogConfig()
  };
  const result = await window.pyix.saveConfig(config);
  if (result.success) toast('Config saved!', 'success');
}

async function loadConfig() {
  const result = await window.pyix.loadConfig();
  if (result.success && result.config) {
    const cfg = result.config;
    if (cfg.botName) $('#botName').value = cfg.botName;
    if (cfg.prefix) $('#botPrefix').value = cfg.prefix;
    if (cfg.commandType && $('#commandType')) { $('#commandType').value = cfg.commandType; bindCommandType(); }
    if (cfg.status) $('#botStatus').value = cfg.status;
    if (cfg.activityType && $('#botActivityType')) $('#botActivityType').value = cfg.activityType;
    if (cfg.activity) $('#botActivity').value = cfg.activity;
    if (cfg.commands) commands = cfg.commands;
    if (cfg.autoResponses) { autoResponsesList = cfg.autoResponses; renderAutoResponses(); }
    if (cfg.logConfig) {
      const lc = cfg.logConfig;
      if ($('#logMsgDelete')) $('#logMsgDelete').checked = lc.msgDelete || false;
      if ($('#logMsgEdit')) $('#logMsgEdit').checked = lc.msgEdit || false;
      if ($('#logMemberJoin')) $('#logMemberJoin').checked = lc.memberJoin || false;
      if ($('#logMemberLeave')) $('#logMemberLeave').checked = lc.memberLeave || false;
      if ($('#logChannelId')) $('#logChannelId').value = lc.logChannelId || '';
    }
    if (cfg.automod) {
      const am = cfg.automod;
      if ($('#automodSpam')) $('#automodSpam').checked = am.antiSpam || false;
      if ($('#automodLinks')) $('#automodLinks').checked = am.antiLinks || false;
      if ($('#automodCaps')) $('#automodCaps').checked = am.antiCaps || false;
      if ($('#automodWords')) $('#automodWords').checked = am.badWords || false;
      if ($('#automodMassMention')) $('#automodMassMention').checked = am.massMention || false;
      if ($('#automodInvites')) $('#automodInvites').checked = am.antiInvites || false;
      if ($('#automodAction')) $('#automodAction').value = am.action || 'delete';
      if ($('#automodLogChannel')) $('#automodLogChannel').value = am.logChannel || '';
      if ($('#automodExemptRole')) $('#automodExemptRole').value = am.exemptRole || '';
      if ($('#badWordsList')) $('#badWordsList').value = (am.badWordsList || []).join(', ');
    }
    selectedCommandId = null;
    editorPanel.classList.add('hidden');
    renderCommands();
    updateStats();
    toast('Config loaded!', 'success');
  }
}

// ─── Helpers ───
function generateUID() {
  return 'cmd_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toast(msg, type = 'success') {
  const container = $('#toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ─── Page Navigation ───
function bindNavigation() {
  $$('#navRail .nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      navigateTo(item.dataset.page);
    });
  });
}

function navigateTo(pageId) {
  $$('#navRail .nav-item[data-page]').forEach(n => n.classList.remove('active'));
  const navItem = $(`#navRail .nav-item[data-page="${pageId}"]`);
  if (navItem) navItem.classList.add('active');
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = $(`#page${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`);
  if (page) page.classList.add('active');
  activeTab = pageId;
}

// ─── Category Filter ───
function bindCategoryFilter() {
  $$('#categoryFilter .cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $$('#categoryFilter .cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategoryFilter = chip.dataset.cat;
      renderCommands(searchInput.value);
    });
  });
}

// ─── Editor Tabs (Settings / Logic / Preview) ───
const editorLogic = $('#editorLogic');
function bindEditorTabs() {
  $$('.editor-tabs .etab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.editor-tabs .etab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.etab;
      editorBody.classList.add('hidden');
      editorLogic.classList.add('hidden');
      editorPreview.classList.add('hidden');
      if (target === 'settings') {
        editorBody.classList.remove('hidden');
      } else if (target === 'logic') {
        editorLogic.classList.remove('hidden');
        renderLogicEditor();
      } else {
        editorPreview.classList.remove('hidden');
        renderDiscordPreview();
      }
    });
  });
}

// ─── Discord Preview in Editor ───
function renderDiscordPreview() {
  const cmd = commands.find(c => c.uid === selectedCommandId);
  if (!cmd) return;
  const f = cmd.fields;
  const prefix = $('#botPrefix').value || '!';
  const botName = $('#botName').value || 'Pyix Bot';

  let userMsg = `${prefix}${f.commandName}`;
  let botReply = f.response || 'Command executed.';
  botReply = botReply.replace(/{author}/g, 'User#1234').replace(/{server}/g, 'My Server').replace(/{target}/g, 'Target#5678').replace(/{reason}/g, 'being cool').replace(/{duration}/g, '10m').replace(/{count}/g, '3').replace(/{latency}/g, '42').replace(/{apiLatency}/g, '18').replace(/{args}/g, 'example text');

  const useEmbed = f.successEmbed || f.useEmbed || false;
  const embedColor = f.embedColor || '#ff7814';

  let botContent = '';
  if (useEmbed) {
    botContent = `<div class="dc-embed">
        <div class="dc-embed-accent" style="background:${embedColor}"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-desc">${escHtml(botReply)}</div>
        </div>
      </div>`;
  } else {
    botContent = `<div class="dc-msg-text">${escHtml(botReply)}</div>`;
  }

  const preview = $('#discordPreview');
  preview.innerHTML = `
    <div class="dc-msg">
      <div class="dc-avatar">U</div>
      <div class="dc-msg-body">
        <div class="dc-msg-author">User#1234 <span class="dc-timestamp">Today at 12:00</span></div>
        <div class="dc-msg-text">${escHtml(userMsg)} @Target#5678 being cool</div>
      </div>
    </div>
    <div class="dc-msg">
      <div class="dc-avatar" style="background:linear-gradient(135deg,#5865f2,#7289da);">B</div>
      <div class="dc-msg-body">
        <div class="dc-msg-author" style="color:#5865f2">${escHtml(botName)} <span class="dc-timestamp">Today at 12:00</span></div>
        ${botContent}
      </div>
    </div>`;
}

// ─── Duplicate Command ───
function duplicateCommand() {
  const cmd = commands.find(c => c.uid === selectedCommandId);
  if (!cmd) return;
  const dup = JSON.parse(JSON.stringify(cmd));
  dup.uid = generateUID();
  dup.fields.commandName = dup.fields.commandName + '_copy';
  commands.push(dup);
  renderCommands(searchInput.value);
  selectCommand(dup.uid);
  updateStats();
  toast('Command duplicated!', 'success');
}

// ─── Embed Builder ───
function bindEmbedBuilder() {
  const inputs = ['embedCmdName', 'embedTitle', 'embedDesc', 'embedColor', 'embedColorText', 'embedThumb', 'embedImage', 'embedFooter'];
  inputs.forEach(id => {
    const el = $(`#${id}`);
    if (el) el.addEventListener('input', updateEmbedPreview);
  });

  const colorPicker = $('#embedColor');
  const colorText = $('#embedColorText');
  if (colorPicker && colorText) {
    colorPicker.addEventListener('input', () => { colorText.value = colorPicker.value; updateEmbedPreview(); });
    colorText.addEventListener('input', () => { colorPicker.value = colorText.value; updateEmbedPreview(); });
  }

  const addFieldBtn = $('#addEmbedField');
  if (addFieldBtn) addFieldBtn.addEventListener('click', () => {
    embedFields.push({ name: '', value: '', inline: false });
    renderEmbedFields();
    updateEmbedPreview();
  });

  const sendBtn = $('#sendEmbedWebhook');
  if (sendBtn) sendBtn.addEventListener('click', sendEmbedViaWebhook);

  updateEmbedPreview();
}

function renderEmbedFields() {
  const container = $('#embedFieldsList');
  if (!container) return;
  container.innerHTML = embedFields.map((f, i) => `
    <div class="embed-field-row">
      <input type="text" placeholder="Field name" value="${escHtml(f.name)}" data-ef-idx="${i}" data-ef-prop="name" />
      <input type="text" placeholder="Field value" value="${escHtml(f.value)}" data-ef-idx="${i}" data-ef-prop="value" />
      <button class="icon-btn" data-ef-remove="${i}" title="Remove">✕</button>
    </div>`).join('');

  container.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      const idx = parseInt(inp.dataset.efIdx);
      embedFields[idx][inp.dataset.efProp] = inp.value;
      updateEmbedPreview();
    });
  });
  container.querySelectorAll('[data-ef-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      embedFields.splice(parseInt(btn.dataset.efRemove), 1);
      renderEmbedFields();
      updateEmbedPreview();
    });
  });
}

function updateEmbedPreview() {
  const container = $('#embedPreviewLive');
  if (!container) return;
  const title = $('#embedTitle')?.value || '';
  const desc = $('#embedDesc')?.value || '';
  const color = $('#embedColor')?.value || '#ff7814';
  const thumb = $('#embedThumb')?.value || '';
  const image = $('#embedImage')?.value || '';
  const footer = $('#embedFooter')?.value || '';

  let fieldsHtml = '';
  if (embedFields.length) {
    fieldsHtml = '<div class="dc-embed-fields">' + embedFields.filter(f => f.name || f.value).map(f =>
      `<div class="dc-embed-field inline"><div class="dc-embed-field-name">${escHtml(f.name)}</div><div class="dc-embed-field-value">${escHtml(f.value)}</div></div>`
    ).join('') + '</div>';
  }

  container.innerHTML = `
    <div class="dc-embed">
      <div class="dc-embed-accent" style="background:${color}"></div>
      <div class="dc-embed-body">
        ${title ? `<div class="dc-embed-title">${escHtml(title)}</div>` : ''}
        ${desc ? `<div class="dc-embed-desc">${escHtml(desc)}</div>` : ''}
        ${fieldsHtml}
        ${image ? `<img class="dc-embed-image" src="${escHtml(image)}" onerror="this.style.display='none'" />` : ''}
        ${footer ? `<div class="dc-embed-footer">${escHtml(footer)}</div>` : ''}
      </div>
      ${thumb ? `<img class="dc-embed-thumb" src="${escHtml(thumb)}" onerror="this.style.display='none'" />` : ''}
    </div>`;
}

async function sendEmbedViaWebhook() {
  const webhookUrl = $('#embedWebhookUrl')?.value?.trim();
  if (!webhookUrl) { toast('Please enter a webhook URL', 'error'); return; }
  if (!webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
    toast('Invalid webhook URL', 'error'); return;
  }

  const title = $('#embedTitle')?.value || '';
  const desc = $('#embedDesc')?.value || '';
  const color = $('#embedColor')?.value || '#ff7814';
  const thumb = $('#embedThumb')?.value || '';
  const image = $('#embedImage')?.value || '';
  const footer = $('#embedFooter')?.value || '';

  if (!title && !desc) { toast('Embed needs at least a title or description', 'error'); return; }

  const embed = {};
  if (title) embed.title = title;
  if (desc) embed.description = desc;
  embed.color = parseInt(color.replace('#', ''), 16);
  if (thumb) embed.thumbnail = { url: thumb };
  if (image) embed.image = { url: image };
  if (footer) embed.footer = { text: footer };
  if (embedFields.length) {
    embed.fields = embedFields.filter(f => f.name || f.value).map(f => ({
      name: f.name || '\u200b',
      value: f.value || '\u200b',
      inline: f.inline || false
    }));
  }

  const btn = $('#sendEmbedWebhook');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }

  const result = await window.pyix.sendWebhook(webhookUrl, { embeds: [embed] });

  if (btn) { btn.disabled = false; btn.textContent = 'Send via Webhook'; }

  if (result.success) {
    toast('Embed sent successfully!', 'success');
  } else {
    toast('Failed: ' + (result.error || 'Unknown error'), 'error');
  }
}

// ─── Code Preview ───
function bindCodePreview() {
  const refreshBtn = $('#refreshCodePreview');
  const copyBtn = $('#copyCodePreview');
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    lastGeneratedCode = generateBotCode();
    const block = $('#codePreviewBlock');
    if (block) block.querySelector('code').textContent = lastGeneratedCode;
  });
  if (copyBtn) copyBtn.addEventListener('click', () => {
    if (!lastGeneratedCode) { toast('Click Refresh first', 'error'); return; }
    navigator.clipboard.writeText(lastGeneratedCode).then(() => toast('Copied!', 'success'));
  });

  // Modal
  const closeModal = $('#closeCodeModal');
  if (closeModal) closeModal.addEventListener('click', () => $('#codeModal').classList.add('hidden'));
  const modalCopy = $('#modalCopyCode');
  if (modalCopy) modalCopy.addEventListener('click', () => {
    navigator.clipboard.writeText(lastGeneratedCode).then(() => toast('Copied!', 'success'));
  });
  const modalExport = $('#modalExportCode');
  if (modalExport) modalExport.addEventListener('click', async () => {
    const result = await window.pyix.exportBot(lastGeneratedCode);
    if (result.success) { toast('Exported!', 'success'); $('#codeModal').classList.add('hidden'); }
  });
}

function showCodeModal() {
  const enabledCmds = commands.filter(c => c.enabled);
  if (enabledCmds.length === 0) { toast('Add at least one command first', 'error'); return; }
  lastGeneratedCode = generateBotCode();
  const block = $('#modalCodeBlock');
  if (block) block.querySelector('code').textContent = lastGeneratedCode;
  $('#codeModal').classList.remove('hidden');
}

// ─── Clear All Commands ───
function clearAllCommands() {
  if (commands.length === 0) { toast('No commands to clear', 'error'); return; }
  if (!confirm('Are you sure? This will remove all commands.')) return;
  commands = [];
  selectedCommandId = null;
  editorPanel.classList.add('hidden');
  renderCommands();
  updateStats();
  toast('All commands cleared', 'success');
}

// ─── Auto-Responses Binding ───
function bindAutoResponses() {
  const addBtn = $('#addAutoResponse');
  if (addBtn) addBtn.addEventListener('click', () => {
    autoResponsesList.push({ trigger: '', response: '', exact: false });
    renderAutoResponses();
  });
  renderAutoResponses();
}

// ─── Dashboard Extras ───
function updateDashboardExtras() {
  // Category distribution
  const distEl = $('#cmdDistribution');
  if (!distEl) return;
  const cats = {};
  commands.forEach(c => { cats[c.category] = (cats[c.category] || 0) + 1; });
  const total = commands.length || 1;
  const catMeta = {
    moderation: { label: 'Moderation', color: '#ef4444' },
    utility: { label: 'Utility', color: '#3b82f6' },
    fun: { label: 'Fun', color: '#a855f7' },
    info: { label: 'Info', color: '#06b6d4' },
    events: { label: 'Events', color: '#f59e0b' },
    custom: { label: 'Custom', color: '#22c55e' }
  };
  if (commands.length === 0) {
    distEl.innerHTML = '<p style="color:var(--text-muted);font-size:13px;">Add commands to see distribution</p>';
    return;
  }
  distEl.innerHTML = `
    <div class="dist-bar">${Object.entries(cats).map(([cat, count]) => {
      const meta = catMeta[cat] || { label: cat, color: '#888' };
      return `<div class="dist-seg" style="width:${(count / total * 100).toFixed(1)}%;background:${meta.color}" title="${meta.label}: ${count}"></div>`;
    }).join('')}</div>
    <div class="dist-legend">${Object.entries(cats).map(([cat, count]) => {
      const meta = catMeta[cat] || { label: cat, color: '#888' };
      return `<span class="dist-legend-item"><span class="dist-dot" style="background:${meta.color}"></span>${meta.label} (${count})</span>`;
    }).join('')}</div>`;
}

// ─── Logging Code Generation ───
function generateLoggingCode() {
  const lc = getLogConfig();
  if (!lc.logChannelId) return '';
  let code = '';
  if (lc.msgDelete) {
    code += `\nclient.on('messageDelete', (message) => {
  if (message.author?.bot) return;
  const logCh = message.guild?.channels.cache.get('${lc.logChannelId}');
  if (!logCh) return;
  const embed = new EmbedBuilder()
    .setTitle('Message Deleted')
    .setColor('#ef4444')
    .addFields(
      { name: 'Author', value: message.author?.tag || 'Unknown', inline: true },
      { name: 'Channel', value: message.channel.toString(), inline: true },
      { name: 'Content', value: (message.content || '*No text*').slice(0, 1024) }
    ).setTimestamp();
  logCh.send({ embeds: [embed] });
});\n`;
  }
  if (lc.msgEdit) {
    code += `\nclient.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.author?.bot || oldMessage.content === newMessage.content) return;
  const logCh = oldMessage.guild?.channels.cache.get('${lc.logChannelId}');
  if (!logCh) return;
  const embed = new EmbedBuilder()
    .setTitle('Message Edited')
    .setColor('#f59e0b')
    .addFields(
      { name: 'Author', value: oldMessage.author?.tag || 'Unknown', inline: true },
      { name: 'Channel', value: oldMessage.channel.toString(), inline: true },
      { name: 'Before', value: (oldMessage.content || '*empty*').slice(0, 1024) },
      { name: 'After', value: (newMessage.content || '*empty*').slice(0, 1024) }
    ).setTimestamp();
  logCh.send({ embeds: [embed] });
});\n`;
  }
  if (lc.memberJoin) {
    code += `\nclient.on('guildMemberAdd', (member) => {
  const logCh = member.guild.channels.cache.get('${lc.logChannelId}');
  if (!logCh) return;
  const embed = new EmbedBuilder()
    .setTitle('Member Joined')
    .setColor('#22c55e')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(\`\${member.user.tag} (\${member.id})\`)
    .addFields({ name: 'Account Age', value: \`<t:\${Math.floor(member.user.createdTimestamp / 1000)}:R>\` })
    .setTimestamp();
  logCh.send({ embeds: [embed] });
});\n`;
  }
  if (lc.memberLeave) {
    code += `\nclient.on('guildMemberRemove', (member) => {
  const logCh = member.guild.channels.cache.get('${lc.logChannelId}');
  if (!logCh) return;
  const roles = member.roles.cache.filter(r => r.id !== member.guild.id).map(r => r.name).join(', ') || 'None';
  const embed = new EmbedBuilder()
    .setTitle('Member Left')
    .setColor('#ef4444')
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(\`\${member.user.tag} (\${member.id})\`)
    .addFields({ name: 'Roles', value: roles })
    .setTimestamp();
  logCh.send({ embeds: [embed] });
});\n`;
  }
  return code;
}

// ─── Start ───
init();
