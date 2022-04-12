export default class Graph {
    constructor(ctx, width, height, realWidth, realHeight) {
        ctx.save()
        ctx.translate(realWidth / 2, realHeight / 2)
        this.ctx = ctx
        this.width = width
        this.height = height
        this.realWidth = realWidth
        this.realHeight = realHeight
    }

    drawAxes() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        this.ctx.beginPath()

        this.ctx.moveTo(0, -this.realHeight * 10)
        this.ctx.lineTo(0, this.realHeight * 10)

        this.ctx.moveTo(-this.realWidth * 10, 0)
        this.ctx.lineTo(this.realWidth * 10, 0)

        this.ctx.stroke()

        this.ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        this.ctx.lineWidth = 1

        const divisorLength = 2

        let xNumber = -(this.width / 2)
        for (let i = 0; i <= this.width; i++) {
            this.ctx.beginPath()
            const spacing = this.realWidth / this.width
            const x = i * spacing - this.realWidth / 2
            const y = 0
            if (spacing > 13) this.ctx.fillText(xNumber, x - 3, y + 15)
            this.ctx.moveTo(x, y - divisorLength)
            this.ctx.lineTo(x, y + divisorLength)
            this.ctx.stroke()
            xNumber++
        }

        let yNumber = this.height / 2
        for (let i = 0; i <= this.height; i++) {
            this.ctx.beginPath()
            const spacing = this.realHeight / this.height
            const x = 0
            const y = i * spacing - this.realHeight / 2
            if (spacing > 13) this.ctx.fillText(yNumber, x + 5, y + 3)
            this.ctx.moveTo(x - divisorLength, y)
            this.ctx.lineTo(x + divisorLength, y)
            this.ctx.stroke()
            yNumber--
        }
    }

    drawLine(x1, y1, x2, y2) {
        this.ctx.lineWidth = 2
        const spacingX = this.realWidth / this.width
        const spacingY = this.realHeight / this.height
        x1 = x1 * spacingX
        y1 = -y1 * spacingY
        x2 = x2 * spacingX
        y2 = -y2 * spacingY

        this.ctx.strokeStyle = 'rgba(200, 0, 0, 1)'
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }
}
