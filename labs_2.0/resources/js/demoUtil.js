
var DemoUtil = { };

DemoUtil.data = {
	//TTS Demo Data
	'A_TTS_02' : {
		'service' 	: 'tts',
		'name'		: '음성합성 요청(TTS)',
		'request'	: {
			'apiCd': "A_TTS_02",
			'requestType': "3",
			'responseType': "2",
			'body': {
				"charSet":"-1",
				"appDomain":"",
				"fileName":"",
				"requestDateTime":"20220401173905252",
				"format":"-1",
				"language":"0",
				"deviceID":"0001",
				"speed":"-1",
				"crypto":"c9a6855971fba648",
				"volume":"-1",
				"macAddress":"00216BF998D1",
				"localLog":'',
				"speaker":"15",
				"text":"주가가 5% 올라갔습니다.",
				"pitch":"-1"
			}				
		}
	},
	//STT Demo Data
	'A_STT_01' : {
		'service' 	: 'stt',
		'name'		: '음성분석(STT)',
		'request'	: {
			'apiCd': "A_STT_01",
			'requestType': "2",
			'responseType': "2",
			'body': {
				
			}				
		}
		
	},
	//NLP Styling Demo Data
	'A_NLP_01' : {
		'service' 	: 'nlp',
		'name'		: '대화스타일링 요청',
		'request'	: {
			'apiCd': "A_NLP_01",
			'requestType': "1",
			'responseType': "1",
			'body': {
				
			}				
		}
	},
	//NLP Intent Classification Demo Data
	'A_NLP_02' : {
		'service' 	: 'nlp',
		'name'		: '의도분류 요청',
		'request'	: {
			'apiCd': "A_NLP_02",
			'requestType': "1",
			'responseType': "1",
			'body': {
				
			}				
		}
	},
	//NLP Summary Demo Data
	'A_NLP_03' : {
		'service' 	: 'nlp',
		'name'		: '요약문생성 요청',
		'request'	: {
			'apiCd': "A_NLP_03",
			'requestType': "1",
			'responseType': "1",
			'body': {
				
			}				
		}
	},
	//NLP MRC Demo Data
	'A_NLP_04' : {
		'service' 	: 'nlp',
		'name'		: '문서독해 요청',
		'request'	: {
			'apiCd': "A_NLP_04",
			'requestType': "1",
			'responseType': "1",
			'body': {
				
			}				
		}
	},
	//VisionAI Demo Data
	'A_VS_01' : {
		'service' 	: 'vs',
		'name'		: '얼굴인식 요청',
		'request'	: {
			'apiCd': "A_VS_01",
			'requestType': "2",
			'responseType': "2",
			'body': {
				
			}				
		}
	},
		
};

DemoUtil.getApiCdList = function() {
	var list = [];
	$.each(DemoUtil.data, function(key) {
		list.push({
			'key': key,
			'name' : DemoUtil.data[key].name
		});
		
	});
	return list;
};

//Demo & FreeTrial 상세내용 가져오기
DemoUtil.getDemo = function(templateCd, apiCd) {
	var $target = undefined;
	if (templateCd === undefined) {
		return;
	} else if (templateCd instanceof $) {
		$target = templateCd;
	} else {
		$target = $('#'+templateCd);
	}
	
	//Layout 추가
	$target.html(DemoUtil.getLayout(apiCd));
	
	switch(apiCd) {
	case 'A_TTS_02':
		DemoUtil.getTTS($target, DemoUtil.data['A_TTS_02']);		
		break;
	case 'A_NLP_01':
		DemoUtil.getNLPStyling($target, DemoUtil.data['A_NLP_01']);
		break;
	case 'A_NLP_02':
		DemoUtil.getNLPIntent($target, DemoUtil.data['A_NLP_02']);
		break;
	case 'A_NLP_03':
		DemoUtil.getNLPSummary($target, DemoUtil.data['A_NLP_03']);
		break;
	case 'A_NLP_04':
		DemoUtil.getNLPMachineReading($target, DemoUtil.data['A_NLP_04']);
		break;
	case 'A_VS_01':
		DemoUtil.getVSFaceRecog($target, DemoUtil.data['A_VS_01']);
		break;
	case 'A_STT_01':
		DemoUtil.getSTT($target, DemoUtil.data['A_STT_01']);
		break;
	default:
		if (apiCd.startsWith('https://www.youtube.com/embed/')) {
			$target.find('#content01').html('<iframe class="serviceCaseIframe" width="100%" height="100%" src="' + apiCd + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>');
			
			$target.find('#demoContain').css({
				'width': '100%',
				'text-align': 'center'
			});
			$target.find('#content01').css({
				'width': '48%',
			    'height': '500px',
			    'display': 'inline-block'
			});
			$target.find('#content02').hide();
		}
		
		break;	
	}
	
	
};



DemoUtil.getLayout = function(apiCd) {
	var html = '';
	html += '<div style="width:100%;height:auto">';
	html += '	<input type="hidden" value="' + apiCd + '" id="apiCd">';
	html += '	<div id="demoContain">';
	html += '		<div id="content01"></div>';
	html += '		<div id="content02"></div>';
	html += '	</div>';
	html += '</div>';
		
	return html;	
	
};


DemoUtil.getTTS = function($target, data) {
	var sampleData = [
		"높은 음질의 자연스러운 음성 합성 기술을, 다양한 오디오 콘텐츠와 음성안내 서비스에 사용해 보세요.",
		"오늘, 맑은 하늘에 깨끗한 공기, 따스한 봄볕까지 봄을 느끼기 참 좋겠는데요, 현재 서울 기온은 15도 안팎까지 올라 어제 같은 시각과 비슷합니다."
	];
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'width': '100%',
		'height': '100%'
	});
	
	$content01.css({
		'width': '100%',
		'height': '50%',
	});
	
	$content02.css({
		'width': '100%',
		'height': 'auto',
	});
	
	
	//TTS Player Layout 생성
	var waveSurfer = DemoUtil.createWaveSurfer($content01);
	titleLayout = '    		<h3 style="margin-top:10px;padding-left:35px;">음성합성 (Text-to-Speech)</h3>';
	$content01.prepend(titleLayout);
	
	//TTS Sample Layout 생성
	var sampleLayout = '';
	sampleLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	sampleLayout += '	<dt id="sampleTTSList" style="width:100%;height:auto;padding-left:35px;margin-top:10px;">';
	for (var i=0; i < sampleData.length; i++) {
		sampleLayout += '	<a href="javascript:" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 90%;" title="' + sampleData[i] + '" >' + sampleData[i] + '</a>' 		
	}
	sampleLayout += '	</dt>';
	sampleLayout += '	<dt style="width:100%;height:auto;padding-left:35px;margin-top:10px;">';
	sampleLayout += '		<input type="text" id="ttsText" style="width:75%; padding:5px; margin-right:10px;">';
	sampleLayout += '		<a href="javascript:" id="sendTTS">음성합성 요청</a>';
	sampleLayout += '	</dt>';
	sampleLayout += '</dl>';
	$content02.html(sampleLayout);
	
	$content02.find('#sendTTS').css({
		'display': 'inline-block',
		'width': '140px',
		'height': '40px',
		'color': '#fff',
	    'background-color': '#2bb7b3',
	    'border-radius': '30px',
	    'text-align': 'center',
		'vertical-align': 'middle',
		'font-size': '18px',
	    'line-height': '45px',
	    'font-family': '"Campton Bold", "NotoSansKR Bold", sans-serif',
	    'margin-top': '5px'
	});
	
	//Event
	$content02.find('#sampleTTSList').find('a').click(function() {
		var ttsText = $(this).text();
		$content02.find('#ttsText').val(ttsText);
	});
	
	
	$content02.find('#sendTTS').click(function() {
		var ttsText = $content02.find('#ttsText').val();
		
		if (ttsText == '') {
			$.alert('확인', '음성합성요청 전 합성될 문장을 입력해 주세요', function() {
				$('#ttsText').focus();
			});
			return;
		}
		
		data.request.body.text = ttsText;
		
		Q.fcall(function() {
			
			$(document).block(true);
			return;		
		})
		.then(function() {
			
			return ApiLinkUtil.send({
				'type': 'POST',
				'url': '/api/demo/apiLink',
				'data': data.request,
				'timeout' : 30000,
			});
		})
		.then(function(response) {
			//var header = data.header;
			var body = response.body;
			if (body.type == 'audio/wav') {
				var url = URL.createObjectURL(body);
				waveSurfer.load(url);
				
				//
				$content01.find('#btn_play').removeClass('play');
				
			}
		})
		.fail(function(error){
			console.error(error);
		})
		.fin(function(){
			//blocking...close.
			$(document).block(false);
		});
		
	});
	
};

//NLP 스타일링
DemoUtil.getNLPStyling = function($target, data) {
	var sampleData = [
		"강아지는 정말 귀여운 것 같아요."
	];
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'overflow': 'hidden',
		'width': '100%',
		'height': '100%'
	});
	
	$target.find('#demoContain>div').css('float', 'left');
	
	$content01.css({
		'width': '45%',
		'height': '100%',
	});
	
	
	$content02.css({
		'margin-left': '50px',
		'width': '45%',
		'height': '100%',
	});
	
	
	
	//Content01 layout 생성
	var leftLayout = '';
	leftLayout += '<dl style="display:flex; flex-direction:column;padding:0px; border:0px; width:100%;height:100%">';
	leftLayout += '	<dt id="sampleNlpList" style="width:100%;height:auto;">';
	leftLayout += '    <div class="inputArea">';
	leftLayout += '    		<h3 style="margin-top:0;color:#727272;">&#8251; 변환할 문장을 입력해주세요.</h3>'
	leftLayout += '    		<textarea readonly rows="10" cols="50" style="height: 100px;font-size: 20px;">';
	for (var i=0; i < sampleData.length; i++) {
		leftLayout += sampleData[i]; 		
	}
	leftLayout += '</textarea>';
	leftLayout += '    </div>';
	leftLayout += '	</dt>';
	leftLayout += '	<dt style="width:auto;height:auto;text-align:center;margin-top:10px;">';
	leftLayout += ' 	<div class="choosePersona">';
	leftLayout += ' 		<span class="inputR"><input type="radio" class="persona" id="sweetGenie"></span> <label for="sweetGenie">다정한 지니 </label> ';
	leftLayout += ' 		<span class="inputR"><input type="radio" class="persona" id="cuteGenie"></span> <label for="cuteGenie">귀여운 말투 </label>';
	leftLayout += ' 		<span class="inputR"><input type="radio" class="persona" id="calmGenie"></span> <label for="calmGenie">차분한 말투 </label> ';
	leftLayout += ' 	</div>';
	leftLayout += ' 	<div class="startBtnArea" style="text-align:center;">';
	leftLayout += ' 		<a href="javascript:;" id="startBtn">스타일링 변환</a>';
	leftLayout += ' 	</div>';
	leftLayout += '	</dt>';
	leftLayout += '</dl>';
	$content01.html(leftLayout);
	
	
	//Content02 layout 생성
	var rightLayout = '';
	rightLayout += '<dl style="display:flex; flex-direction:column;padding:0px; border:0px; width:100%;height:100%">';
	rightLayout += '	<dt style="width:100%;height:auto;">';
	rightLayout += '    <div class="resultArea">';
	rightLayout += '    	<h3 style="margin-top:0;margin-bottom: 18px;">변환 결과</h3>';
	rightLayout += '    	<textarea readonly rows="10" cols="50" style="font-size: 20px; color: #00CCBB; height: 100px;" >';
	rightLayout += '    	</textarea>';
	rightLayout += '    </div>';
	rightLayout += '	</dt>';
	rightLayout += '</dl>';
	$content02.html(rightLayout);
	
	
	
	$(function(){
		$('.choosePersona').find('.inputR').eq(0).addClass('on');

		//Event
		//페르소나 선택
		$content01.find('.persona').click(function(){
			$content01.find('.inputR').removeClass('on');
			$(this).parent('.inputR').addClass('on');
			
		})
		
		
		//분석시작
		$content01.find('#startBtn').click(function() {
			//request
			var txt = $('.inputArea').children('textArea').html();
			data.request.body.text = txt;
			
			//임시
			var sampleAnswer = [
				"강아지는 항상 귀엽죠",
				"멍멍이는 너무 귀여워잉",
				"강아지는 언제나 귀여운 것 같습니다."
			]
			
			var idx = $content01.find('.on').index('.choosePersona>.inputR');
			$('.resultArea').children('textarea').html(sampleAnswer[idx]);
		
			Q.fcall(function() {
			
			$(document).block(true);
			return;		
			})
			.then(function() {
				
				/*return ApiLinkUtil.send({
					'type': 'POST',
					'url': '/api/demo/apiLink',
					'data': data.request,
					'timeout' : 30000,
				});*/
			})
			//분석결과 출력
			.then(function(response) {
				//var header = data.header;
				//var body = response.body;
				/*if (body.type == 'audio/wav') {
					var url = URL.createObjectURL(body);
					waveSurfer.load(url);
					
					//
					$content01.find('#btn_play').removeClass('play');
					
				}*/
	
			})
			.fail(function(error){
				console.error(error);
			})
			.fin(function(){
				//blocking...close.
				$(document).block(false);
			});
		
		});
	
	});
	
};

//NLP 의도분류
DemoUtil.getNLPIntent = function($target, data) {
	
	//음식 주문
	var foodOrder = [
		"마카롱을 주문했는데 마카롱이 엄청 딱딱해요.",
		"세트로 구입했는데 어떤 마카롱이 나오나요?",
		"딸기맛 대신 초코맛으로 변경 가능한가요?"
	]
	//병원 예약
	var reservation = [
		"내일 10시에 진료 예약 할게요.",
		"금요일 오후 2시 반 예약 취소하고 싶어요.",
		"혹시 스케일링 가격이 얼마나 되나요?"
	]
	//구조 요청
	var sos = [
		"위층에서 불이 났어요, 도와주세요.",
		"할머니께서 쓰러지셨어요. 언제 오실 수 있나요?",
		"잘못 걸었어요. 죄송합니다."
	]
	//샘플 데이터
	var sampleData = {
		'음식 주문' : foodOrder,
		'병원 예약' : reservation,
		'구조 요청' : sos
	}

	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'overflow': 'hidden',
		'width': '100%',
		'height': '100%'
	});
	
	$target.find('#demoContain>div').css('float', 'left');
	
	$content01.css({
		'width': '45%',
		'height': '100%',
	});
	
	
	$content02.css({
		'margin-left': '50px',
		'width': '45%',
		'height': '100%',
	});
	
	
	var sampleKeys = Object.keys(sampleData);
	//Content01 layout 생성
	var leftLayout = '';
	leftLayout += '<dl style="display:flex; flex-direction:column;padding:0px; border:0px; width:100%;height:100%">';
	leftLayout += '	<dt id="sampleNlpList" style="width:100%;height:auto;">';
	leftLayout += '    <div class="inputArea">';
	leftLayout += '    		<h3 style="margin-top:0;">의도 분류 모델</h3>';
	leftLayout += '    		<select id="intentCs" style="width:470px;">';
	for (var i=0; i < sampleKeys.length; i++) {
		leftLayout += '<option id="intentCategory">' + sampleKeys[i] + '</option>';
	}
	leftLayout += '			</select>';
	leftLayout += '    		<h3 style="color:#727272;">추론할 문장을 선택해주세요.</h3>';
	leftLayout += '    		<select id="intentQs" style="width:470px;">';
	leftLayout += '			</select>';
	leftLayout += '    		<textarea readonly rows="10" cols="50" style="height: 100px;font-size: 20px; width:470px; margin-top:5px;">';
	leftLayout += '			</textarea>';
	leftLayout += '    </div>';
	leftLayout += '	</dt>';
	leftLayout += '	<dt style="width:auto;height:auto;text-align:center;margin-top:10px;">';
	leftLayout += ' 	<div class="startBtnArea" style="width: 470px;text-align:center;">';
	leftLayout += ' 		<a href="javascript:;" id="startBtn">의도 추론</a>';
	leftLayout += ' 	</div>';
	leftLayout += '	</dt>';
	leftLayout += '</dl>';
	$content01.html(leftLayout);
	
	
	//Content02 layout 생성
	var rightLayout = '';
	rightLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	rightLayout += '	<dt style="width:100%;">';
	rightLayout += '    <div class="resultArea">';
	rightLayout += '    	<h3 style="margin-top:0">변환 결과</h3>';
	rightLayout += `		<table class="resultTbl tblDef" border="1" style="border: solid 0px;">
								<thead>
									<th>Intent(Goal)</th>
									<th>Confidence</th>
								</thead>
								<tbody>
								</tbody>
							</table>
					`;
	rightLayout += '    </div>';
	rightLayout += '	</dt>';
	rightLayout += '</dl>';
	$content02.html(rightLayout);
	
	
	$(function(){
		
		//첫 카테고리 질문이 나오도록 설정.
		var qHtml = '';
		for (var i=0; i < sampleData["음식 주문"].length; i++) {
			qHtml += '<option class="sampleQs">';
			qHtml += sampleData["음식 주문"][i];
			qHtml += '</option>'; 
		}
		$content01.find('#intentQs').html(qHtml);
		
		$('.resultArea').find('.resultTbl').children('tbody').html('');
		var selectedQ = $content01.find('#intentQs option:selected').val();
		$content01.find('textarea').val(selectedQ);
		
		
		//Event
		//카테고리 변경시
		$content01.find('#intentCs').change(function(){
			$('.resultArea').find('.resultTbl').children('tbody').html('');
			var selectedC = $content01.find('#intentCs option:selected').val();
			qHtml = '';
			//해당 카테고리 옵션이 나오도록
			for (var i=0; i< sampleData[selectedC].length; i++) {
				qHtml += '<option class="sampleQs">';
				qHtml += sampleData[selectedC][i];
				qHtml += '</option>'; 
			}
			$content01.find('#intentQs').html(qHtml);
			//카테고리 변경시 해당 카테고리 첫번째 질문이 textarea에 나오도록 설정
			var selectedQ = $content01.find('#intentQs option:selected').val();
			$content01.find('textarea').val(selectedQ);
			
			
			
		});
		
		//카테고리에 따른 질문을 변경할 때
		$content01.find('#intentQs').change(function(){
			$('.resultArea').find('.resultTbl').children('tbody').html('');
			var selectedQ = $content01.find('#intentQs option:selected').val();
			
			Q.fcall(function(){
				$content01.find("textarea").hide();
				$content01.find("textarea").fadeIn("slow");
			})
			.fin(function(){
				$content01.find('textarea').val(selectedQ);
			});
			
		})

		
		//의도 추론 시작
		$content01.find('#startBtn').click(function() {
			//테이블결과 초기화
			$('.resultArea').find('.resultTbl').children('tbody').html('');
			//request
			var category = $('#intentCs option:selected').val();
			var idx = $('#intentQs option:selected').index();
			
			
			//분석결과 (임시)
			var foodOrderR = {
				'제품_불량_질문' 	: ['0.92', '0.02', '0.05'],
				'제품_정보_질문' 	: ['0.05', '0.87', '0.07'],
				'제품_구성_질문' 	: ['0.03', '0.94', '0.93']
			};
			
			var reservationR = {
				'가격_문의'		: ['0.03', '0.02', '0.93'],
				'서비스_문의' 		: ['0.45', '0.87', '0.07'],
				'서비스_예약' 		: ['0.92', '0.94', '0.05']
			};
			
			var sosR = {
				'재난_상황' 	  : ['0.92', '0.02', '0.05'],
				'응급_이송_상황' : ['0.05', '0.87', '0.07'],
				'구조_요청_취소' : ['0.03', '0.94', '0.93']
			};
			
			var sampleResult = {
				'음식 주문' : foodOrderR,
				'병원 예약' : reservationR,
				'구조 요청' : sosR
			}
			
			//결과 테이블 구성
			//테이블 의도 범위
			var intentClass = Object.keys(sampleResult[category]);
			var rHtml = '';
				
			for (var i=0; i< sampleData[category].length; i++) {
				rHtml += '<tr>';
				rHtml += '<td>' + intentClass[i] + '</td>';
				rHtml += '<td>' + sampleResult[category][intentClass[i]][idx] + '</td>';
				rHtml += '</tr>';
				
			}
			
			$('.resultArea').find('.resultTbl').children('tbody').append(rHtml);
		
		
		});
	
	});
	
};

//NLP 요약문생성
DemoUtil.getNLPSummary = function($target, data) {
	//샘플 상담내용
	var sampleScript = "상담사:파이브지를 선도하는 케이티 배 유진입니다<br>고객:네 저기 그 <span>핸드폰 보험 기간 좀 확인할려고 전화</span>드렸는데요<br>상담사:아 그러세요 문의하신 핸드폰 번호 먼저 부탁드립니다<br>"
		+"고객:%#번호#<br>상담사:바로 조회를 해보도록 하겠습니다 잠시만 기다려주시겠습니까<br>상담사:기다려주셔서 감사합니다 명의자분 성함과 생년월일 같이 부탁드립니다<br>" 
		+"고객:%#이름#이고요 %#날짜#였어요<br>상담사:네 %#이름# 고객님 본인 맞습니까<br>상담사:아 그러세요 네 %#주소#이하 주소 부탁드립니다<br>"
		+"고객:%#주소#요<br>상담사:네 소중한 고객 정보 확인 감사드립니다<br>상담사: 아 현재 <span>단말기 보험 가입이 완료되어 있는 것으로 확인</span>이 되었습니다<br>"
		+"고객:예 제가 그건 기억하는데 지금 기간이 /상담사: 네네 <br>고객:지금 혜택을 받을 수 있는 기간이니까 싶어서 오래 됐어요<br>"
		+"상담사:네 보험 만기일자는 이천 심구년 칠월 심 구일까지 이제 이개월 정도 남았습니다<br>고객:그니까 이년 남은거 맞죠 제가/상담사:네 맞습니다<br>"
		+"상담사:혹시 보험센터로 바로 연결 도와드리도록 할까요 <br>고객: 아니요 제가 지금 왔는데요 핸드폰을 떨어뜨려서 이쪽도 나가고<br>"
		+"상담사:네네<br>상담사:아 많이 속상하셨겠습니다<br>고객:핸드폰 좀 이상해서 가지고 왔는데 여러 문제가 있다고 하셔가지고 확인하고 진행하려고 전화드렸어요<br>"
		+"상담사:네네<br>상담사:혹시 보험센터 전화번호 제가 넘겨드리도록 할까요<br>고객:아 그건 제가 와있어요<br>상담사:아 그러시군요 네 잘알겠습니다 네네 전<br>"
		+"고객:네 접수했어요 네 보험은 되는걸로 알고 있으면 되죠<br>상담사:네 그렇습니다 아니 아니 삼성센터가 아니고요 보험센터가 또 이제 별도 있거든요 나중에 이제 "
		+"보험 청구하실 때 네네 서류는 어떤 서류 준비하셔야 될지 혹시 이제 상담 받아 아 그러시다면 좀 <span>보험센터 한번 지금 바로 연결 도와드리도록 할까요</span><br>"
		+"고객: 아 아 아 네네네<br>고객:네네<br>상담사:네 단말기 보험센터로 지금 연결하겠습니다<br>상담사:저는 케이티 상담사 배 유진 이었습니다";
	
	var sampleData = [
		"S01. <br>"+sampleScript,
		"S02. <br>"+sampleScript,
		"S03. <br>"+sampleScript
	];
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'overflow': 'hidden',
		'width': '100%',
		'height': '850px'
	});
	
	$target.find('#demoContain>div').css('float', 'left');
	
	$content01.css({
		'width': '47%',
		'height': '100%',
	});
	
	
	$content02.css({
		'margin-left': '50px',
		'width': '45%',
		'height': '100%',
	});
	
	
	
	//Content01 layout 생성
	var leftLayout = '';
	leftLayout += '<ul class="tabs" style="margin-top:10px;">';
	leftLayout += '	<li class="tab-link current" data-tab="tab-1">사례 1</li>';
	leftLayout += ' <li class="tab-link" data-tab="tab-2">사례 2</li>';
	leftLayout += ' <li class="tab-link" data-tab="tab-3">사례 3</li>';
	leftLayout += '</ul>';
	leftLayout += '<dl style="display:flex; flex-direction:column;padding:0px; border:0px; width:100%;height:100%">';
	leftLayout += '	<dt id="sampleNlpList" style="width:100%;height:auto;">';
	
	for (var i=0; i < sampleData.length; i++) {
		leftLayout += '	<div class="sampleArea" id="tab-'+(i+1)+'">';
		leftLayout += ' 	<h3 style="margin-top:10px;color:#727272;">&#8251; KT 100번 대화 사례 '+(i+1)+'</h3>'
		leftLayout += '    	<div class="textArea scrollArea" style="height: 600px;font-size: 20px;">';
		leftLayout += 			sampleData[i];
		leftLayout += '    	</div>';
		leftLayout += ' </div>';	
	}
	leftLayout += '	</dt>';
	leftLayout += '	<dt style="width:auto;height:auto;text-align:center;margin-top:10px;">';
	leftLayout += '	</dt>';
	leftLayout += '</dl>';
	$content01.html(leftLayout);
	
	
	//Content02 layout 생성
	var rightLayout = '';
	rightLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	rightLayout += '	<dt style="width:100%;">';
	rightLayout += ' 		<div class="startBtnArea" style="text-align:center;">';
	rightLayout += ' 			<a href="javascript:;" id="startBtn">요약문 생성</a>';
	rightLayout += ' 		</div>';
	rightLayout += '    	<div class="resultArea">';
	rightLayout += '    		<h3 style="margin-top:0">요약 결과</h3>';
	rightLayout += '    		<textarea readonly rows="2" cols="50" style="height:200px;margin-top:18px; font-size: 20px; color: #2bb7b3;" >';
	rightLayout += '    		</textarea>';
	rightLayout += '    	</div>';
	rightLayout += '	</dt>';
	rightLayout += '</dl>';
	$content02.html(rightLayout);
	

	
	$(function(){
		$('.sampleArea').hide();
		$('#tab-1').show();
		$('#tab-1').addClass('current');
		
		//Event
		$content01.find('.tab-link').click(function(){
			var idx = $('.tab-link').index(this)+1;
			$('.sampleArea').hide();
			$('#tab-'+idx).show();
			$('.tab-link').removeClass('current');
			$('.textArea').children('span').removeClass('emp');
			$(this).addClass('current');
			$('.resultArea').children('textarea').html('');
			
		});
		
		
		//요약 생성 시작
		$content02.find('#startBtn').click(function() {
			$('.textArea').children('span').addClass('emp');
			$('.resultArea').children('textarea').html("핸드폰 보험기간 확인을 요청하여 단말기 보험 가입이 완료되어 있는 것으로 확인된다고 안내한 후 보험센터로 연결해 주었다.");
			var txt = $('.inputArea').children('textArea').html();
	
		
			data.request.body.text = txt;
		
		
		});
	
	});
	
}

//NLP 문서독해 
DemoUtil.getNLPMachineReading = function($target, data) {
	var sampleScript = "<span id='mr0' class='mrTxt'>기택(송강호)네는 반지하에 사는 전원 백수 가족이다.</span> 옆집 와이파이를 훔쳐 쓰고, 동네 피자집 박스 접기 아르바이트로 근근이 생활한다."
		+" <span id='mr2' class='mrTxt'>장남 기우(최우식)는 명문대생 친구 민혁(박서준)과 만나 재물운을 가져다준다는 비싼 수석을 선물받고 술자리를 함께한다.</span> 민혁은 세계적인 IT기업 CEO인" 
		+" 박사장(이선균)의 딸 다혜(정지소)의 영어 과외선생이었으나 교환 학생으로 유학을 가게 되었고, 기우에게 자신을 대신하여 과외 선생으로 소개시켜 주겠다는 제안을"
		+" 한다. 동생 기정(박소담)의 도움으로 명문대생으로 위장한 채 박 사장의 집에 입성한 기우는 첫 수업을 무사히 마치고, 박 사장의 아내 연교(조여정)와 이야기를"
		+" 나눈다. <span id='mr1' class='mrTxt'>그 과정에서 기우는 박 사장네 막내인 다솜(정현준)의 그림 선생이 여러 번 바뀌었다는 사실을 알게 되고, 동생 기정을 다솜의 새로운 그림 과외 선생으로"
		+" 소개한다.</span> 기정은 인터넷에서 읽은 미술 치료에 대한 지식으로, 다솜이 초등학교 1학년 때 집에서 본 귀신으로 트라우마를 앓고 있다는 사실을 맞춰 연교의 신뢰를 얻는다.";
		
	var sampleData = [
		sampleScript
	];
	
	var sampleQuestions = [
		"기택이네는 어디 살아?",
		"기정이는 박 사장네에서 무얼 가르쳐?",
		"기우는 민혁이한테 뭘 선물로 받았어?"
	]
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'width': '100%',
		'height': 'auto;'
	});
	
	
	$content01.css({
		'width': '100%',
		'height': '70%',
	});
	
	
	$content02.css({
		'width': '100%',
		'height': '30%',
	});
	
	
	
	//Content01 layout 생성
	var topLayout = '';
	topLayout += '<div class="mrcTit">';
	topLayout += '	<h2>문서독해</h2> <span class="def">MRC: Machine Reading Comprehension</span>'
	topLayout += '</div>';
	topLayout += '<h3>본문과 질문이 주어졌을 때, 본문에서 정답을 추출합니다.</h3>';
	topLayout += '<dl style="display:flex; flex-direction:column;padding:0px; border:0px; margin-bottom: 0px; width:100%;height:100%">';
	topLayout += '	<dt id="sampleNlpList" style="width:100%;height:auto;">';
	
	topLayout += '<div class="mrcTab" >';
	topLayout += '	<h3>&#8251; 본문을 입력하세요.</h3>';
	topLayout += '</div>';
	topLayout += '<div class="sampleReading">';
	topLayout += ' <div class="textArea" readonly style="width:100%;height:auto;font-size:20px;" value="">'

	topLayout += '</div>';
	topLayout += '</div>';
	
	topLayout += '	<div class="questionArea">';
	topLayout += '		<h3>질문</h3>';
	topLayout += '	</div>';

	//퀴즈 예제
	topLayout += '<div>';
	topLayout += '	<div class="sampleQuiz">';
	topLayout += '		<input type="text" readonly class="mrc-quiz" id="quiz-q" value="">';
	for (var i=0; i < sampleQuestions.length; i++){
		topLayout += '    <a href="javascript:;" class="mrc-tab" data-tab="tab-'+(i)+'">예제 '+(i+1)+'</li>';
	}
	topLayout += '</div>';

	topLayout += '<div class="askQuestion">';
	topLayout += '	<a href="javascript:;" class="questionBtn">질문하기</a>';
//	topLayout += '  <li class="reset" style="color:black;border:2px solid #727272;">초기화</li>';
//	topLayout += '  <a href="javascript:;" id="resetQuestion">질문 초기화</a>';
	topLayout += '</div>';
	topLayout += '</dt>';
	topLayout += '<dt style="width:auto;height:auto;text-align:center;margin-top:10px;">';
	topLayout += '</dt>';
	topLayout += '</dl>';
	$content01.html(topLayout);
	
	
	
	//Content02 layout 생성
	var bottomLayout = '';
	bottomLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	bottomLayout += '	<dt style="width:100%;">';
	bottomLayout += '    	<div class="resultArea">';
	bottomLayout += '    		<h3 style="margin-top:0px;">정답</h3>';
	bottomLayout += '    		<textarea readonly rows="2" cols="50" style="height:100px;margin-top:18px; font-size: 20px; color: #2bb7b3;" >';
	bottomLayout += '    		</textarea>';
	bottomLayout += '    	</div>';
	bottomLayout += '	</dt>';
	bottomLayout += '</dl>';
	$content02.html(bottomLayout);
	

	
	$(function(){
		$content01.find('.sampleReading').children('div').html(sampleData);
		$('.sampleReading').hide();
		$('.sampleReading').eq(0).show();
		$('#quiz-q').val(sampleQuestions[0]);
		$('.mrc-tab').eq(0).addClass('current');
		
		//Event 예제
		$content01.find('.mrc-tab').click(function(){
			var idx = $('.mrc-tab').index(this);
			$('.mrc-tab').removeClass('current');
			$(this).addClass('current');
			$('#quiz-q').val(sampleQuestions[idx]);
			$('.resultArea').children('textarea').html('');
			$('.mrTxt').removeClass('mrBold');
			
			
		});
		
		
		//분석 시작
		$content01.find('.questionBtn').click(function() {
			var idx = $content01.find('.mrc-tab.current').index('.mrc-tab');
			var sampleAnswers = [
				"반지하",
				"그림",
				"수석"
			];
			$('.resultArea').children('textarea').html(sampleAnswers[idx]);
			//정답 문장 표시
			$('.mrTxt').removeClass('mrBold');
			$('#mr'+idx).addClass('mrBold');
			
		});
	
	});
	
};

//얼굴검출 Face Recognition
DemoUtil.getVSFaceRecog = function($target, data) {
	var sampleData = [
		'<img class="vsImg" src="/image/api/demo1_input.jpg">',
		'<img class="vsImg" src="/image/api/demo2_input.jpg" style="display:none;">',
		'<img class="vsImg" src="/image/api/demo3_input.png" style="display:none;">'
	];
	
	var sampleInput = [
		'/image/api/demo1_input.jpg',
		'/image/api/demo2_input.jpg',
		'/image/api/demo3_input.png'
	];
	
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'overflow': 'hidden',
		'width': '100%',
		'height': '100%'
	});
	
	$target.find('#demoContain>div').css('float', 'left');
	
	$content01.css({
		'width': '45%',
		'height': '100%',
		'text-align': 'center'
	});
	
	
	$content02.css({
		'margin-left': '120px',
		'width': '40%',
		'height': '100%',
	});
	
	
	
	//Content01 layout 생성
	var leftLayout = '';
	leftLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	leftLayout += '	<div id="sampleVSList">';
	for (var i=0; i < sampleData.length; i++) {
		leftLayout += '	<a href="javascript:;" class="viewImg">' +  sampleData[i] + '</a>'; 		
	}
	leftLayout += '	</div>';
	leftLayout += '	<dt style="width:auto;height:auto;text-align:center;margin-top:10px;">';
	leftLayout += '		<ul id="vsOptions" style="height:auto;">';
	leftLayout += '			<li><a href="javascript:;" class="sampleNo on">얼굴 검출</a></li>';
	leftLayout += '			<li><a href="javascript:;" class="sampleNo">얼굴 랜드마크</a></li>';
	leftLayout += '			<li><a href="javascript:;" class="sampleNo">얼굴 인식 (유사도)</a></li>';
	leftLayout += '		</ul>';
	leftLayout += '	</dt>';
	leftLayout += '</dl>';
	$content01.html(leftLayout);
	
	
	//Content02 layout 생성
	var rightLayout = '';
	rightLayout += '<dl style="padding:0px; border:0px; width:100%;height:100%">';
	rightLayout += '	<dt style="width:100%;vertical-align:middle;margin-top:10px;">';
	rightLayout += '    	<div class="startBtnArea" style="margin-top:20%;text-align:center;">';
	rightLayout += '   			<a href="javascript:;" id="startBtn" style="margin-right:17%;">실행</a>';
	rightLayout += '    	</div>';
	rightLayout += '    	<div class="resultArea" style="display:none;">';
	rightLayout += '    		<textarea class="scrollArea" readonly rows="10" cols="50" style="margin-top:22px;">';
	rightLayout += '    		</textarea>';
	rightLayout += '    	</div>';
	rightLayout += '	</dt>';
	rightLayout += '</dl>';
	$content02.html(rightLayout);

	
	$content01.find('ul>li').css({
		'float'				: 'left'	   
	});
	
	$(function(){
		
		//Event
		//초기화
		$content01.find('.sampleNo').click(function() {
			var idx = $('.sampleNo').index(this);
			$('.viewImg').children('.vsImg').eq(idx).attr('src',sampleInput[idx]);
			//얼굴인식요청 버튼
			$('.startBtnArea').show();
			//결과창 숨김
			$('.resultArea').hide();
			//해당 이미지만 노출
			$('.vsImg').hide();
			$('.vsImg').eq(idx).show();
			//숫자 tab 효과
			$('.sampleNo').removeClass('on');
			$(this).addClass('on');
			
	
		});

		
		//분석시작
		$content02.find('#startBtn').click(function() {
			var idx = $content01.find('.sampleNo.on').index('.sampleNo');
			var sampleOutput = [
				'/image/api/demo1_output.jpg',
				'/image/api/demo2_output.jpg',
				'/image/api/demo3_output.png'
			];
			var sampleTextBox = [
				`{
		"resultList": 
	[
	{
			“label”: “face_with_nomask”,
			“confidence”: 0.999288,
			“rect”:
			{   
	“vertices”: 
	[
	  {
		“x”:180,
		“y”:238
	   },
	   …
	   {
		 “x”:749,
		 “y”:927
	   },
	  ]
    }
}
				`,
				`{
	“success” : true,
	“code”: 200 ,
	“data”:
		[[227.173, 440.773],[226.453,
		514.812], ,,, , [473.906, 765.851]]
}
	
				`,
				`{
	“Matching Score : 65.3159 %”
}
				`
			];
			
			//output 출력
			$('.viewImg').children('.vsImg').eq(idx).attr('src',sampleOutput[idx]);

			//분석버튼 숨김
			$('.startBtnArea').hide();
			$('.resultArea').children('textarea').html("");
			//좌표 표시
			$('.resultArea').children('textarea').html(sampleTextBox[idx]);
			$('.resultArea').show();
		
		});
	});

};
/* STT Demo */
DemoUtil.getSTT = function($target, data) {
	var isSTTUse = false; 
	
	var $demoContain = $target.find('#demoContain');
	var $content01 = $demoContain.find('#content01');
	var $content02 = $demoContain.find('#content02');
	
	$demoContain.css({
		'width': '100%',
		'height': 'auto',
		'min-height': '249px',
		'display': 'inline-flex'
	});
	
	$content01.css({
		'width': '55%',
		'height': '100%',
		'display': 'inline',
//		'float': 'left'
	});
	
	$content02.css({
		'width': '45%',
		'height': 'auto',
		'display': 'inline',
//		'float': 'right'
	});
	
	
	//Content01 Layout
	var content01Layout = '';
	content01Layout += '<div style="padding-left:30px; margin-top:10px;">'; 
	content01Layout += '    		<h3 style="margin-top:0;color:#727272;">&#8251; 변환할 음성 샘플을 선택해주세요.</h3>';
	content01Layout += '	<a href="javascript:" id="sample01" class="sampleSTT" style="background: url(/image/main/ai_dialog_m.png) 10px center no-repeat;background-size: 45px;padding: 10px 2px 12px 56px;">Sample01</a>';
	content01Layout += '	<a href="javascript:" id="sample02" class="sampleSTT" style="background: url(/image/main/ai_dialog_m.png) 10px center no-repeat;background-size: 45px;padding: 10px 2px 12px 56px;">Sample02</a>';
	if (isSTTUse) {
		content01Layout += '	<a href="javascript:" id="btn_mic" style="background: url(/image/icon/mic_off.png) 10px center no-repeat;background-size: 45px;padding: 10px 2px 12px 56px;">Recording <span id="record_sec">(5sec)</span></a>';
	}
	content01Layout += '</div>';
	content01Layout += '<div style="width:100%;">';
	content01Layout += '	<dl style="padding: 0px 10px 0px 120px !important;border: 0px solid #d6d6d6 !important;display: inline-flex; width: 450px; height: 65px; background: url(/image/sub/voice_bg.png) 30px center no-repeat; background-size: 85px" >';
	content01Layout += '		<div id="waveSurfer" style="width: 70%; margin-right: 20px;"></div>';
	content01Layout += '		<div id="waveSurferBtn"><image src="/image/icon/play_off.png" id="btn_play" style="margin-top: 5px;height:55px;"></div>';
	content01Layout += '	</dl>';
	content01Layout += '</div>';

	//Content02 Layout
	var content02Layout = '';
	content02Layout += '<div style="margin-top:0px;">';
	content02Layout += '    		<h3 style="margin-top:10px;">변환 결과</h3>';
	content02Layout += '	<a href="javascript:" id="btn_reqSTT" style="line-height: 40px;display: inline;padding: 5px 20px;border-radius: 20px;background-color:#4bcac6;color:#ffffff;">음성분석 요청</a>';
	content02Layout += '</div>';
	content02Layout += '<div id="sttResult" style="border: solid 1px #dddddd; margin-top:10px;padding:5px 15px; height:100px;">';
	content02Layout += '</div>';
	
    
	
	//Layout 추가
	$content01.html(content01Layout);
	$content02.html(content02Layout);
	
	//파일 로딩
	var base64EncFile = undefined;
	var playerLoad = (url, blob) => {
		//player 버튼 초기화
		$target.find('#btn_play').removeClass('play');
		waveSurfer.load(url);

		//STT결과 초기화
		$('#sttResult').text('');
		
		Q.fcall(function() {
			$(document).block(true);
			return;		
		})
		.then(function(){
			if (blob instanceof Blob) {
				//blob타입으로 들어온 경우
				return blob
			} else {
				//URL타입으로 들어온경우
				return ApiLinkUtil.send({
					'type': 'GET',
					'url': url,
					'timeout' : 30000,
				});
			}
		})
		.then(function(b) {
			if (blob instanceof Blob) {
				return ApiLinkUtil.getBlobToBase64(b);
			} else {
				return ApiLinkUtil.getBlobToBase64(b.body);
			}
		})
		.then(function(encData) {
			base64EncFile = encData;
		})
		.fail(function(error){
			console.error(error);
		})
		.fin(function(){
			
			//blocking...close.
			$(document).block(false);
		});
	};


	//Player 초기화
	var waveSurfer = WaveSurfer.create({
	    container: '#waveSurfer',
		height:	65,				//웨이브 폼 전체 높이
		plugins: [
			//음성 파형 위 커서 커스텀
			 WaveSurfer.cursor.create({
	            showTime: true,
	            opacity: 1,
	            customShowTimeStyle: {
	                'background-color': '#000',
	                'color': '#fff',
	                'padding': '2px',
	                'font-size': '10px'
	            }
	        })
		]
	});
	waveSurfer.load('/sample/break_3s.wav');
	
	//Player 완료 Event
	waveSurfer.on('finish', function() {
//		$target.find('#btn_play').removeClass('play');
		
		$target.find('#btn_play').removeClass('play');
		$target.find('#btn_play').removeClass('pause');
		$target.find('#btn_play').prop('src', '/image/icon/play_off.png');
		
		
			
	});
	
	
	//Web Mic 초기화
	if (isSTTUse) {
		var micObj = new DemoUtil.createWebMic(function(url, blob) {
			//Mic 완료 시 player 음성 초기화
			playerLoad(url, blob);
			//문구 초기화
			$('#record_sec').text("(5sec)");	
		});	
	}

	//Player 버튼 Event
	waveSurfer.on('ready', function() {
		$target.find('#btn_play').off('click.play').on('click.play', function() {
			if ($(this).hasClass('play')) {
				$(this).removeClass('play');
				waveSurfer.pause();
			} else {
				$(this).addClass('play');
				waveSurfer.play();
			}
		});
	});
	
	
	
	//Event추가
	waveSurfer.on('ready', function() {
		$target.find('#btn_play').hover(
				function() {
					if ($(this).hasClass('pause')) {
						$(this).prop('src', '/image/icon/pause_on.png');
					} else {
						$(this).prop('src', '/image/icon/play_on.png');
					}
				},
				function() {
					if ($(this).hasClass('pause')) {
						$(this).prop('src', '/image/icon/pause_off.png');
					} else {
						$(this).prop('src', '/image/icon/play_off.png');
						
					}
				}
		)
		
		
		$target.find('#btn_play').off('click.play').on('click.play', function() {
			var isPlay = $(this).hasClass('play');
			var isPause = $(this).hasClass('pause');
			
			if (!isPlay) {
				//음성 초기 시작
				//play
				$(this).addClass('play');
				$(this).removeClass('pause');
				waveSurfer.play();
				$(this).prop('src', '/image/icon/play_on.png');
				
			} else if (isPlay && !isPause) {
				//음성 멈춤
				$(this).addClass('pause');
				waveSurfer.pause();
				$(this).prop('src', '/image/icon/pause_on.png');
				
			} else if (isPlay && isPause) {
				//음성 계속
				$(this).removeClass('pause');
				waveSurfer.play();
				$(this).prop('src', '/image/icon/play_on.png');
			}
		});
	});
	
//	waveSurfer.on('finish', function() {
//		$target.find('#btn_play').removeClass('play');
//		$target.find('#btn_play').removeClass('pause');
//		$target.find('#btn_play').prop('src', '/image/icon/play_off.png');
//			
//	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//Timmer 
	var timmerId = undefined;
	var timmer = function(sec, func) {
		if (sec >= 0) {
			$('#record_sec').text("(" + sec + "sec)");
			timmerId = setTimeout(function() {
				timmer(sec -1, func);				
			}, 1000);
		} else {
			$('#record_sec').text("(5sec)");	
			func();
		}
	};

	//Timmer Clear
	var timmerClear = function() {
		if (timmerId !== undefined) {
			clearTimeout(timmerId);
			timmerId = undefined;			
		}
	};
	
	//마이크 Event
	$('#btn_mic').click(function() {
		if ($(this).hasClass('mic_on')) {
			//녹음 중지
			micObj.stop();
			$(this).removeClass('mic_on');
			$(this).css({
				"background": "url(/image/icon/mic_off.png) 10px center no-repeat",
				"background-size": "45px"
					
			});
			
			timmerClear();
		} else {
			//녹음 시작
			micObj.start();
			$(this).addClass('mic_on');
			$(this).css({
				"background": "url(/image/icon/mic_on.png) 10px center no-repeat",
				"background-size": "45px"
			});
			
			timmer(5, function() {
				if ($('#btn_mic').hasClass('mic_on')) {
					$('#btn_mic').trigger('click');					
				} 
			});
		}
	});
	
	//Sample01 Event
	$('#sample01').click(function() {
		$('#sttResult').css('height', '100px');
		$('#sample02').css('color', 'initial');
		$('#sample02').css('font-weight', 'initial');
		
		if ($('#btn_mic').hasClass('mic_on')) {
			$('#btn_mic').trigger('click');
		}
		
		//음성분석요청 버튼에 Sample명 추가
		$('#btn_reqSTT').data('sttDataName', 'sample01');
		
		setTimeout(function() {
			playerLoad('/sample/sample1_full_seg.wav');
			$('#sample01').css('color', '#4bcac6');
			$('#sample01').css('font-weight', 'bolder');
		}, 500);
		
		$('#sttResult').html('');
		$('#sttResult').css('height', '100px');
	});
	
	//Sample02 Event
	$('#sample02').click(function() {
		$('#sttResult').css('height', '100px');
		$('#sample01').css('color', 'initial');
		$('#sample01').css('font-weight', 'initial');
		if ($('#btn_mic').hasClass('mic_on')) {
			$('#btn_mic').trigger('click');
		}
		
		//음성분석요청 버튼에 Sample명 추가
		$('#btn_reqSTT').data('sttDataName', 'sample02');
		
		setTimeout(function() {
			playerLoad('/sample/sample2_full_seg.wav');
			$('#sample02').css('color', '#4bcac6');
			$('#sample02').css('font-weight', 'bolder');
		}, 500);
		
		$('#sttResult').html('');
		$('#sttResult').css('height', '100px');
	});
	
	//음성분석 시작
	$('#btn_reqSTT').click(function() {
		
		if (base64EncFile == undefined) {
			$.alert('확인', '음성파일을 선택하시거나 음성을 녹음해 주세요.');
			return;
		}

		$('#sttResult').html('');
		$('#sttResult').css('height', '100px');
		var sttDataName = $(this).data('sttDataName');
		
		
		var sttData = ApiLinkUtil.createData();
		sttData
		.setApiCd('A_STT_01')
		.setRequestType(2)
		.setResponseType(1)
		.addBodyToBase64EncFile('file', base64EncFile)
		
		var sample01Result = [
			"<b class='scriptTime'>00:00</b><br>우리에겐 아동용 악기라는 묘한 이미지가 박혀 있죠 올려볼게요 하지만 바로크 시대에는 신뢰학에서 매우 중요한 위치를 차지했던 악기였습니다 낮춰주세요 하지만 바로크 시대에는 신뢰학에서 매우 중요한 위치를 차지했던 악기였습니다<br>",
			"<b class='scriptTime'>00:17</b><br>이후 십팔 세기 들어 대편성에 관현곡이 유행하면서 음량이 작은 리코더는 밀려나기 시작했죠 이후 십팔 세기 들어 대편성의 관현곡이 유행하면서 음량이 낮은 리코더는 밀려나기 시작했습니다 그런데<br>",
			"<b class='scriptTime'>00:33</b><br>이십 세기 들어 리코더 부흥 운동이 일어나 교육용 악기로 널리 쓰이게 되었습니다 그런데 이십 세기 들어 리코더 부흥운동이 일어나 교육용 악기로 널리 쓰이게 되었습니다 이런 리코더가 가진 대중성을 가장 잘 구현하고 있는 연주가가 있습니다 바로 미칼라 파트입니다<br>",
			"<b class='scriptTime'>00:53</b><br>이런 리코더가 가진 대중성을 가장 잘 구현하고 있는 연주가가 있습니다 바로 미칼라 파트입니다 어떠신가요 톤을 높였다가 다시 두 톤 맞추는 연습 이 작은 연습이지만 내 목소리 톤을 낮추는 것으로<br>",
			"<b class='scriptTime'>01:11</b><br>사람들에게 신뢰감을 줄 수 있고 좀 더 어 전달력 있는 그런 목소리가 될 수 있습니다 네 여기서 한 가지 팁을 드리자면요 목소리가 잠기거나 갈라지시는 분들이 있어요 왜냐하면 두 톤을 낮췄기 때문인데요 목소리가 잠기시는 분들은 했습니다<br>",
			"<b class='scriptTime'>01:29</b><br>이렇게 잠기시고 자 갈라지시는 분들의 했숨 이렇게 갈라지거나 니 다 이런 식으로 갈라지십니다 어 갈라지거나 잠기지 않으려면 내 말의 의협대를 넓혀야 되거든요 그래서 반복적으로 부분적으로 니 다만 연습하셔야 됩니다<br>"
		];
		
		var sample02Result = [
			"<b class='scriptTime'>00:00</b><br>활계찬 하루가 시작됐습니다 자 중요한 장음 시작이 있네요 시 이 작이라고 느려 쓰시고 이 모음 이에다가 힘을 줘보세요 시작됐습니다 이게 가장 정서인 발음입니다<br>",
			"<b class='scriptTime'>00:16</b><br>이 장금을 지키지 않으시면 싹 이렇게 쉬옷도 세구요 뭔가 느낌이 지적이지 못하게 되거든요 당음을 지키면 어떻게 되나요 리듬감이 살고 전달력도 높아지구요 지적인 느낌이 나게 됩니다<br>",
			"<b class='scriptTime'>00:32</b><br>자 됐습니다 됐 발음을 대충 대시라고 하지 않는지 스스로 점검합시다 뉴스에서는 이중보험을 잘 지키다가도 장르에만 놓으면 발음이 무너지는 친구들이 많거든요 시작됐습니다 됐발음을 끝까지 잘 해주시고<br>",
			"<b class='scriptTime'>00:49</b><br>그다음에 쉬고 나서 그다음 말로 들어갈게요 계속해서 웃어도 될까요 속상한 일들이 조줄이 터진대요 그런데 미소를 계속 유지하는 것은 말이 되지 않습니다 요즘 동영상 전형이 참 많잖아요 일 차 카메라 테스트를 대신하는 것인데<br>",
			"<b class='scriptTime'>01:06</b><br>어 늘 합격을 잘하는 친구들을 보면 표정에도 좀 변화가 있어요 그 내용에 맞게 그런데 합격이 잘 안 되는 친구들을 보면 멘트 내용에 상관없이 처음부터 끝까지 그냥 인형처럼 웃고 있는 걸 자주 보게 됩니다<br>"
		];
		
		
		Q.fcall(function() {
			
			$(document).block(true);
			return;		
		})
		.then(function() {
			return sttData.getData();
		})
		.then(function(sttParamData) {

			if (isSTTUse) {
				return ApiLinkUtil.send({
					'type': 'POST',
					'url': '/api/demo/apiLink',
					'data': sttParamData,
					'timeout' : 30000,
				});
			} else {
				return {
					'body' : {
						'code' : '0000',
						'responseBody' : {
							'text' : (sttDataName == 'sample01' ? sample01Result : sample02Result)
						}
					}
				}
			}
			
			
			
		})
		.then(function(result) {
			if (result != undefined && result.body.code === '0000') {
				var resultTxt = result.body.responseBody.text;
					
				for (var i = 0; i < resultTxt.length; i++) {
					$('#sttResult').append('<span class="resultTxt'+i+'" style="display:none;">' + resultTxt[i] + '</span>');
				}
				
				$('#sttResult').css('height', 'auto');			
				$('#sttResult').children('.resultTxt0').fadeIn(500);
				
				
				setTimeout(function() {
					$('#sttResult').children('.resultTxt1').fadeIn(500);
				}, 600);
				
				setTimeout(function() {
					$('#sttResult').children('.resultTxt2').fadeIn(500);
				}, 1200);
				
				setTimeout(function() {
					$('#sttResult').children('.resultTxt3').fadeIn(500);
				}, 1800);
				
				setTimeout(function() {
					$('#sttResult').children('.resultTxt4').fadeIn(500);
				}, 2400);
				
				setTimeout(function() {
					$('#sttResult').children('.resultTxt5').fadeIn(500);
				}, 3000);
				
				
			} else {
				$.alert('확인', '잠시후 다시 요청해 주세요.');
			}
			
		})
		.fail(function(error){
			console.error(error);
		})
		.fin(function(){
			//blocking...close.
			$(document).block(false);
		});
		
	});
};


DemoUtil.createWaveSurfer = function(playerLayoutTarget) {
	var $target = undefined;
	
	if (playerLayoutTarget === undefined) {
		return;
	} else if (playerLayoutTarget instanceof $) {
		$target = playerLayoutTarget;
	} else {
		$target = $('#'+playerLayoutTarget);
	}
	
		
	var playerHtml = `
		<dl class="voiceDemo" >
			<div id="waveSurfer""></div>
			<div id="waveSurferBtn"><image src="/image/icon/play_off.png" id="btn_play" style="margin-top: 5px;"></div>
		</dl>
	`;
	
	$target.html(playerHtml);
	
	var waveSurfer = WaveSurfer.create({
	    container: '#waveSurfer',
//	    waveColor: 'violet',		//파형 색상
//	    progressColor: 'purple'		//진행 파형 색상
//		hideScrollbar: 'false',		//가로 스크롤바 표시 여부
		height:	80,				//웨이브 폼 전체 높이
		plugins: [
			//음성 파형 위 커서 커스텀
			 WaveSurfer.cursor.create({
	            showTime: true,
	            opacity: 1,
	            customShowTimeStyle: {
	                'background-color': '#000',
	                'color': '#fff',
	                'padding': '2px',
	                'font-size': '10px'
	            }
	        })
		]
	});
	
	waveSurfer.load('/sample/break_3s.wav');
	
	//Event추가
	waveSurfer.on('ready', function() {
		$target.find('#btn_play').hover(
				function() {
					if ($(this).hasClass('pause')) {
						$(this).prop('src', '/image/icon/pause_on.png');
					} else {
						$(this).prop('src', '/image/icon/play_on.png');
					}
				},
				function() {
					if ($(this).hasClass('pause')) {
						$(this).prop('src', '/image/icon/pause_off.png');
					} else {
						$(this).prop('src', '/image/icon/play_off.png');
						
					}
				}
		)
		
		
		$target.find('#btn_play').off('click.play').on('click.play', function() {
			var isPlay = $(this).hasClass('play');
			var isPause = $(this).hasClass('pause');
			
			if (!isPlay) {
				//음성 초기 시작
				//play
				$(this).addClass('play');
				$(this).removeClass('pause');
				waveSurfer.play();
				$(this).prop('src', '/image/icon/play_on.png');
				
			} else if (isPlay && !isPause) {
				//음성 멈춤
				$(this).addClass('pause');
				waveSurfer.pause();
				$(this).prop('src', '/image/icon/pause_on.png');
				
			} else if (isPlay && isPause) {
				//음성 계속
				$(this).removeClass('pause');
				waveSurfer.play();
				$(this).prop('src', '/image/icon/play_on.png');
			}
		});
	});
	
	waveSurfer.on('finish', function() {
		$target.find('#btn_play').removeClass('play');
		$target.find('#btn_play').removeClass('pause');
		$target.find('#btn_play').prop('src', '/image/icon/play_off.png');
			
	});
	
	
	
	return waveSurfer;
};



DemoUtil.createWebMic = function(completeFunc) {
	if (!navigator.mediaDevices) {
		console.error("web mic error: no support navigator.mediaDevices");
		return;
	}

	var mediaRecorder = undefined;
	var chunks = [];
	var isStart = false;

	this.start = function() {
		if (!isStart && mediaRecorder !== undefined) {
			mediaRecorder.start();
			isStart = true;    
		}
	};

	this.stop = function() {
		if (isStart && mediaRecorder !== undefined) {
			mediaRecorder.stop();
			isStart = false;    
		}
	}

	//Audio Mic 
	navigator.mediaDevices
	.getUserMedia({         //Audio Mic 객체 생성
		'audio' : true
	})
	.then(stream => {
		mediaRecorder = new MediaRecorder(stream);
		
		mediaRecorder.onstop = e => {
			const blob = new Blob(chunks, {
				'type': 'audio/ogg codecs=opus'
			})
			chunks = []
			const audioURL = URL.createObjectURL(blob)
			

			if (typeof completeFunc === 'function') {
				completeFunc(audioURL, blob);
			}
			// $('#audio').find('source').prop('src', audioURL);
			// $('#audio').prop('src', audioURL);
		};


		mediaRecorder.ondataavailable = e => {
			chunks.push(e.data)
		};
	})
	.catch(err => {
		console.error('The following error occurred: ' + err)
	});
};



