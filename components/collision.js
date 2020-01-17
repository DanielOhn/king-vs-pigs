var Collision = () => {

  function contain(sprite, container) {
    let collision = undefined;

    // Left
    if (sprite.x < container.x ) {
      sprite.x = container.x;
      collision = 'left';
    }

    //Top
    if (sprite.y < container.y) {
      sprite.y = container.y;
      collision = 'top';
    }

    // Right
    if (sprite.x + sprite.width > container.width) {
      sprite.x = container.width - sprite.width;
      collision = 'right';
    }

    // Bottom
    if (sprite.y + sprite.height > container.height) {
      sprite.y = container.height - sprite.height;
      collision = 'bottom';
    }

    // Return the 'collision' value
    return collision;
  }

  function check(r1, r2) {
    // Define variables we'll use to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  
    // hit will determine whether there's a collision
    hit = false;
  
    // Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
  
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    // Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    // Calculate the distance vectors between sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;
  
    // Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  
    // Check collision on x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      // A collisoin might be occuring.  Check for it on y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        // There's definitely a collision happening
        hit = true;
      } else {
        hit = false;
      }
    } else {
      hit = false;
    }
  
    return hit;
  }

}

export default Collision;