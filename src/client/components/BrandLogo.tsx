import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'emblem';
  textColor?: string;
  strokeColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'w-10 h-10',
  variant = 'full',
  strokeColor = '#9d5a44',
  textColor = '#272c30',
}) => {
  if (variant === 'emblem') {
    return (
      <svg
        viewBox="130 50 240 310"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Arched Frame */}
        <path
          d="M 215 338 C 185 342, 155 315, 155 260 L 155 165 A 95 95 0 0 1 345 165 L 345 260 C 345 315, 315 345, 258 343"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hand wrist & thumb */}
        <path
          d="M 220 338 C 225 305, 232 270, 237 252 C 233 245, 226 235, 227 220 C 228 206, 238 198, 243 205 C 246 210, 245 220, 241 230 C 244 240, 247 250, 245 258"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 239 203 C 242 201, 244 204, 243 208"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Index finger */}
        <path
          d="M 245 225 C 245 208, 248 192, 254 182 C 257 178, 260 181, 258 187 C 255 198, 253 214, 253 228"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 255 180 C 258 178, 259 181, 258 185"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Middle finger */}
        <path
          d="M 256 220 C 260 200, 264 185, 270 180 C 273 177, 276 180, 274 186 C 270 197, 266 215, 264 232"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 271 179 C 274 178, 275 181, 274 184"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Ring finger */}
        <path
          d="M 268 226 C 274 212, 278 198, 284 192 C 287 189, 290 192, 288 197 C 284 208, 278 225, 276 238"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 285 191 C 288 190, 289 193, 288 196"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Pinky finger & palm */}
        <path
          d="M 277 236 C 284 226, 292 216, 297 212 C 301 209, 303 213, 301 218 C 297 228, 289 242, 285 252 C 280 268, 265 305, 258 343"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 298 211 C 301 210, 302 213, 301 216"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Palm creases */}
        <path
          d="M 241 262 C 248 268, 256 265, 262 258"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M 247 280 C 253 285, 260 282, 265 275"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Botanical stem */}
        <path
          d="M 243 252 C 246 220, 247 180, 250 92"
          stroke={strokeColor}
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Top leaf */}
        <path
          d="M 250 128 C 242 114, 245 96, 250 90 C 255 96, 258 114, 250 128 Z"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 250 126 L 250 94" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        {/* Top pair leaves */}
        <path
          d="M 249 140 C 238 132, 226 126, 230 112 C 240 114, 248 126, 249 135"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 249 137 C 241 128, 235 122, 231 114" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        <path
          d="M 250 136 C 258 126, 268 118, 275 125 C 272 136, 262 144, 250 142"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 250 138 C 258 131, 266 126, 274 126" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        {/* Middle pair leaves */}
        <path
          d="M 248 162 C 232 152, 214 150, 203 138 C 216 132, 234 140, 248 156"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 248 159 C 233 149, 221 144, 205 139" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        <path
          d="M 249 158 C 264 146, 282 142, 288 152 C 282 165, 264 170, 248 166"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 249 160 C 263 152, 275 150, 286 153" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        {/* Lower pair leaves */}
        <path
          d="M 247 186 C 232 176, 216 178, 208 170 C 219 162, 236 170, 247 180"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 247 183 C 234 175, 223 173, 210 171" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

        <path
          d="M 248 184 C 260 172, 274 172, 284 180 C 278 190, 262 194, 247 190"
          stroke={strokeColor}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M 248 186 C 259 179, 271 178, 282 181" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Arched Frame */}
      <path
        d="M 215 338 C 185 342, 155 315, 155 260 L 155 165 A 95 95 0 0 1 345 165 L 345 260 C 345 315, 315 345, 258 343"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Hand wrist & thumb */}
      <path
        d="M 220 338 C 225 305, 232 270, 237 252 C 233 245, 226 235, 227 220 C 228 206, 238 198, 243 205 C 246 210, 245 220, 241 230 C 244 240, 247 250, 245 258"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 239 203 C 242 201, 244 204, 243 208"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Index finger */}
      <path
        d="M 245 225 C 245 208, 248 192, 254 182 C 257 178, 260 181, 258 187 C 255 198, 253 214, 253 228"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 255 180 C 258 178, 259 181, 258 185"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Middle finger */}
      <path
        d="M 256 220 C 260 200, 264 185, 270 180 C 273 177, 276 180, 274 186 C 270 197, 266 215, 264 232"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 271 179 C 274 178, 275 181, 274 184"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Ring finger */}
      <path
        d="M 268 226 C 274 212, 278 198, 284 192 C 287 189, 290 192, 288 197 C 284 208, 278 225, 276 238"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 285 191 C 288 190, 289 193, 288 196"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Pinky finger & palm */}
      <path
        d="M 277 236 C 284 226, 292 216, 297 212 C 301 209, 303 213, 301 218 C 297 228, 289 242, 285 252 C 280 268, 265 305, 258 343"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 298 211 C 301 210, 302 213, 301 216"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Palm creases */}
      <path
        d="M 241 262 C 248 268, 256 265, 262 258"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 247 280 C 253 285, 260 282, 265 275"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Botanical stem */}
      <path
        d="M 243 252 C 246 220, 247 180, 250 92"
        stroke={strokeColor}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Top leaf */}
      <path
        d="M 250 128 C 242 114, 245 96, 250 90 C 255 96, 258 114, 250 128 Z"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 250 126 L 250 94" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Top pair leaves */}
      <path
        d="M 249 140 C 238 132, 226 126, 230 112 C 240 114, 248 126, 249 135"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 249 137 C 241 128, 235 122, 231 114" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      <path
        d="M 250 136 C 258 126, 268 118, 275 125 C 272 136, 262 144, 250 142"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 250 138 C 258 131, 266 126, 274 126" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Middle pair leaves */}
      <path
        d="M 248 162 C 232 152, 214 150, 203 138 C 216 132, 234 140, 248 156"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 248 159 C 233 149, 221 144, 205 139" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      <path
        d="M 249 158 C 264 146, 282 142, 288 152 C 282 165, 264 170, 248 166"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 249 160 C 263 152, 275 150, 286 153" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Lower pair leaves */}
      <path
        d="M 247 186 C 232 176, 216 178, 208 170 C 219 162, 236 170, 247 180"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 247 183 C 234 175, 223 173, 210 171" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      <path
        d="M 248 184 C 260 172, 274 172, 284 180 C 278 190, 262 194, 247 190"
        stroke={strokeColor}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 248 186 C 259 179, 271 178, 282 181" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />

      {/* Typography */}
      <text
        x="250"
        y="415"
        textAnchor="middle"
        fontFamily="'Playfair Display', 'Cormorant Garamond', 'Cinzel', Didot, 'Bodoni MT', Georgia, serif"
        fontSize="40"
        fontWeight="500"
        letterSpacing="0.3em"
        fill={textColor}
      >
        LUMIÈRE
      </text>
      <text
        x="250"
        y="445"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        fontSize="15"
        fontWeight="400"
        letterSpacing="0.52em"
        fill="#5a5450"
      >
        HAUTE BEAUTÉ
      </text>
    </svg>
  );
};
