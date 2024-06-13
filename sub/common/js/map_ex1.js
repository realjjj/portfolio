window.onload = function() {
    var container = document.getElementById('map'); //불러올 지도를 담는 박스의 id명
    var options = {
        center: new daum.maps.LatLng(37.56061125615662, 126.9478517781153),
        level: 2
    };

    var map = new daum.maps.Map(container, options);
    
    
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new daum.maps.ZoomControl();
    map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);
    
    var markerPosition  = new daum.maps.LatLng(37.56061125615662, 126.9478517781153); 
    var marker = new daum.maps.Marker({
        position: markerPosition
    });

    marker.setMap(map);
    
    var content = '<div class="mapWrap">' + 
            '    <div class="info">' + 
            '        <div class="title">' + 
            '            UNHCR 한국' + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="img">' +
            '                <img src="/sub1/images/away/unhcr_logo.png" width="73" height="70">' +
            '            </div>' + 
            '            <div class="desc">' + 
            '                <div class="ellipsis">서울특별시 중구 을지로 1가 116</div>' + 
            '                <div class="jibun ellipsis">(우)100-842 (지번)금세기빌딩 7층</div>' + 
            '                <div><a href="http://map.daum.net/link/map/UNHCR 한국,37.5665071, 126.9794138"' +
            '                target="_blank" class="link">큰지도보기</a> <a href="http://map.daum.net/link/to/UNHCR 한국,' +
            '                37.5665071, 126.9794138" target="_blank" class="link">길찾기</a></div>' +
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
    
    var overlay = new daum.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
    });

}