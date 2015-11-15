precision highp float;

uniform float time;
uniform vec2 resolution;

float wrap(float x) {
    return abs(mod(x, 2.0) - 1.0) + 0.3;
}

float ball(vec2 p, float fx, float fy, float ax, float ay) {
    vec2 r = vec2(p.x + sin(time * fx) * ax * 2.0, p.y + cos(time * fy) * ay);  
    return ( 0.04 * wrap(time * (0.6 * ay)) ) / length(r);
}


void main() {
    vec2 q = gl_FragCoord.xy / resolution.xy;
    vec2 p = -2.0 + (8.0 * q * 0.5);  
    p.x *= resolution.x / resolution.y;

    float col = 0.0;
    col += ball(p, 1.0, 2.0, 0.2, 0.1);
    
    gl_FragColor = vec4(col * 0.37, col * 0.77, col * 0.90, 0.8);
}