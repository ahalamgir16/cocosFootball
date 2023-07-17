import { _decorator, Collider, Collider2D, Component,  EventMouse, ICollisionEvent, Input, input, Node, physics, Quat, RigidBody2D, UITransform, v2, v3,  Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('trying')
export class trying extends Component {

    // attach this script to ball node which you want to shoot
    
    @property(Node)
    public ball: Node = null;
    @property(Node)
    public player:Node = null;



    public speed = 100; // the speed of the ball





    start() {
        input.on(Input.EventType.MOUSE_DOWN,this.getangle, this );



        // this.ball.on('collisionEnter', this.onCollisionEnter, this);
  

        let collider = this.node.getComponent(Collider2D);
    // Listening to 'onCollisionStay' Events
        collider.on('onCollisionStay', this.onCollision, this);
    }

    onCollision (event: ICollisionEvent) {
        console.log(event.type, event);
    }



    // onCollisionEnter (event: physics.ICollisionEvent) {
    //     let other = event.selfCollider;
    //     console.log(other)
    //     if (other.node.name === 'player') {
    //         console.log(other);
    //     }
    // }


    public angle;
    public mousePos: Vec3=  null;
    public angleToradian;

    

    getangle(event: EventMouse){
        this.mousePos = this.ball.getComponent(UITransform).convertToNodeSpaceAR(v3(event.getUILocationX(), event.getUILocationY(),0))
        this.angle = (360+Math.round(180*Math.atan2(this.mousePos.y, this.mousePos.x)/Math.PI))%360;
        console.log(this.angle)



        let radian = this.angle * Math.PI / 180;
        // Calculate the horizontal and vertical components of the velocity
        let vx = this.speed * Math.cos(radian);
        let vy = this.speed * Math.sin(radian);
        // Apply an impulse force to the rigidbody of the ball
        this.ball.getComponent(RigidBody2D).linearVelocity = v2(vx,vy);


        setTimeout(() => {
            this.ball.setRotation(new Quat(0,0,0,0))
            this.ball.setPosition(0,-333)
            this.ball.getComponent(RigidBody2D).sleep();
            console.log(this.ball.getRotation())
            
        },3000);
        
        
}
}

