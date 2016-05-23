class Speech
	startTimestamp = null
	recognizing = false
	recording = false
	recognition = null
	ignoreEnd = null
	transcript = null
	messages =
		info_recording: 'Speak now.'
		info_no_jsSpeechFactory: 'No jsSpeechFactory was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.'
		info_no_mic: 'No microphone was found. Ensure that a microphone is installed and that'
		info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream'
		info_denied: 'Permission to use microphone was denied.'
		info_start: 'Click on the microphone icon and begin speaking for as long as you like.'
		info_upgrade: 'Web jsSpeechFactory API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.'
		info_allow: 'Click the "Allow" button above to enable your microphone.'

	model =
		icon: null
		status: null
		message: null
		results: null

	elements =
		icon: '.jsSpeechFactory-icon'
		btn: '.jsSpeechFactory-btn'
		container: '.jsSpeechFactory-container'
		hint: '.jsSpeechFactory-hint'
		status: '.jsSpeechFactory-status'
		message: '.jsSpeechFactory-message'

	icons =
		start: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic.gif'
		recording: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic-animate.gif'
		blocked: 'https://dl.dropboxusercontent.com/u/26906414/cdn/img/mic-slash.gif'
	
	
	constructor: () ->
		@model.message = @messages.info_start
	




		#Speech Class -  
		#Holds methods for creating a speech instance, starting and stopping and returning the results
		class Speech 

			icons =
				start: 'mic.gif'
				recording: 'mic-animate.gif'
				blocked: 'mic-slash.gif'

			messages =
				info_speak_now: 'Speak now.'
				info_stop: 'Proccessing your voice...'
				info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.'
				info_no_mic: 'No microphone was found. Ensure that a microphone is installed and that'
				info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream'
				info_denied: 'Permission to use microphone was denied.'
				info_setup: 'Click on the microphone icon to activate voice recognition.'
				info_upgrade: 'Web jsSpeechFactory API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.'
				info_allow: 'Click the "Allow" button above to enable your microphone.'	

			recording = false
			recognition = null

			#Handle initializing
			constructor: () ->
				@setMsg('info_setup')
				@supported = @checkBrowser()
				console.log this

			start: () ->
				@enable()
				recording = true
				recognition.start()

			stop: () ->
				recording = false
				recognition.stop()

			checkBrowser: () ->
				'webkitSpeechRecognition' of window

			setMsg: (key) ->
				if messages[key]
					@message = messages[key] 
				else 
					@message = key

				console.log(key, @message);

			#Handle prompting user to enable voice record
			enable: () ->
				#Get the instance
				recognition = new webkitSpeechRecognition()
				#Continuous listening
				recognition.continuous = true
				recognition.interimResults = true
				#Setup event handlers
				recognition.onstart = @onstart
				recognition.onerror = @onerror
				recognition.onend = @onend
				recognition.onresult = @onresult

			onstart: (event) ->
				console.log(event)

			onend: (event) ->
				console.log(event)

			onresult: (event) ->
				trans = ''
				if typeof (event.results) is 'undefined'
					recognition.onend = null
					recognition.stop()
					return
				i = event.resultIndex
				while i < event.results.length
					trans += event.results[i][0].transcript
					console.log(trans)
					++i
				Speech.message = trans


			onerror: (event) ->
				console.log(event)

















		#Set on window
		window.Speech = new Speech

		#Module instance
		_app = angular.module('jonniespratley.angularWebSpeechDirective', [])

		#Directive Factory
		_app.service 'jsSpeechFactory', (['$rootScope', ($rootScope) -> 

			jsSpeechFactory = 
				startTimestamp: null
				recognizing: false
				recording: false
				recognition: null
				ignoreEnd: null
				transcript: null
				messages:
					info_speak_now: 'Speak now.'
					info_stop: 'Proccessing your voice...'
					info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.'
					info_no_mic: 'No microphone was found. Ensure that a microphone is installed and that'
					info_blocked: 'Permission to use microphone is blocked. To change, go to chrome://settings/contentExceptions#media-stream'
					info_denied: 'Permission to use microphone was denied.'
					info_setup: 'Click on the microphone icon to activate voice recognition.'
					info_upgrade: 'Web jsSpeechFactory API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.'
					info_allow: 'Click the "Allow" button above to enable your microphone.'

				model:
					icon: null
					status: null
					message: null
					results: null

				elements:
					icon: '.jsSpeechFactory-icon'
					btn: '.jsSpeechFactory-btn'
					container: '.jsSpeechFactory-container'
					hint: '.jsSpeechFactory-hint'
					status: '.jsSpeechFactory-status'
					message: '.jsSpeechFactory-message'

				icons:
					start: 'mic.gif'
					recording: 'mic-animate.gif'
					blocked: 'mic-slash.gif'

				init: (options)->
					@options = options
					@scope = options.scope
					console.log 'jsSpeechFactory.init()', this

					if 'webkitSpeechRecognition' of window
						@setup()
					else
						@showUpgrade()

					$rootScope.Speech = this
					this

				#showButtons('inline-block');
				showInfo: (message) ->
					console.log 'jsSpeechFactory.showInfo()', this
					@model.message = @messages[message]
					console.log(message)
					#alert(@messages[message])



				showUpgrade: ->
					console.log 'jsSpeechFactory.showUpgrade()', this


				#Handle setting up everything.
				setup: ->
					console.log 'jsSpeechFactory.setup()', this

					#Setup UI
					@showInfo 'info_setup'
					@model.icon = @icons.start

					#Get the instance
					@recognition = new webkitSpeechRecognition()

					#Continuous listening
					@recognition.continuous = true
					@recognition.interimResults = true



					#Setup event handlers
					@recognition.onstart = @onstart
					@recognition.onerror = @onerror
					@recognition.onend = @onend
					@recognition.onresult = @onresult


				#Handle starting
				start: ->
					console.log 'jsSpeechFactory.start()'
					@showInfo 'info_allow'
					@changeIcon 'blocked'
					@recognition.stop()
					@recognition.start()


				#Handle starting or stopping.
				toggle: -> 
					if @recognizing
						@stop()
					else
						@start()


				#Handle stopping
				stop: ->
					console.log 'jsSpeechFactory.stop()'
					@recognizing = false
					@recognition.stop()
					@changeIcon 'start'
					@showInfo 'info_stop'


				capitalize: (s) ->
					@log s
					s

				changeIcon: (icon) ->
					jsSpeechFactory.model.icon = jsSpeechFactory.icons[icon]



				showResults: (s) ->
					alert(s)

				log: =>
					console.log arguments

				#Handle the onstart event, this event fires when the recording starts.
				onstart: (event) ->
					console.log 'jsSpeechFactory.onstart()', event

					#Listening
					jsSpeechFactory.recognizing = true
					jsSpeechFactory.startTimestamp = new Date()

					#Show message
					jsSpeechFactory.showInfo 'info_speak_now'
					jsSpeechFactory.changeIcon 'recording'

				#Handle the onerror event
				onerror: (event, msg) ->
					console.log 'jsSpeechFactory.onerror()', event

					if event.error is 'no-speech'
						jsSpeechFactory.model.icon = jsSpeechFactory.icons.start
						jsSpeechFactory.showInfo 'info_no_jsSpeechFactory'
						jsSpeechFactory.ignoreEnd = true

					if event.error is 'audio-capture'
						jsSpeechFactory.model.icon = jsSpeechFactory.icons.start
						jsSpeechFactory.showInfo 'info_no_microphone'
						jsSpeechFactory.ignoreEnd = true

					if event.error is 'not-allowed'
						if event.timeStamp - jsSpeechFactory.startTimestamp < 100
							jsSpeechFactory.showInfo 'info_blocked'
						else
							jsSpeechFactory.showInfo 'info_denied'
						jsSpeechFactory.ignoreEnd = true


				onend: (event)->
					jsSpeechFactory.options.onend(event)
					console.log 'jsSpeechFactory.onend()', event
					jsSpeechFactory.recognizing = false

					if jsSpeechFactory.ignoreEnd
					  return

					#Change icon
					jsSpeechFactory.changeIcon 'start'
					unless jsSpeechFactory.transcript
						jsSpeechFactory.showInfo 'info_start'
						return
					jsSpeechFactory.showInfo ''



				onresult: (event) ->
					console.log 'jsSpeechFactory.onresult()', event

					jsSpeechFactory.recognizing = false
					trans = ''
					if typeof (event.results) is 'undefined'
						@recognition.onend = null
						@recognition.stop()
						jsSpeechFactory.showUpgrade()
						return
					i = event.resultIndex

					while i < event.results.length
						trans += event.results[i][0].transcript
						console.log(trans, event.results[i][0])
						jsSpeechFactory.options.onresult(trans)
						++i
					jsSpeechFactory.showResults trans
					jsSpeechFactory.transcript = jsSpeechFactory.capitalize(jsSpeechFactory.transcript)


			window.jsSpeechFactory = jsSpeechFactory
		])