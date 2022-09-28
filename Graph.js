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

        this.ctx.moveTo(0, -this.realHeight / 2)
        this.ctx.lineTo(0, this.realHeight / 2)

        this.ctx.moveTo(-this.realWidth / 2, 0)
        this.ctx.lineTo(this.realWidth / 2, 0)

        this.ctx.stroke()

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        this.ctx.lineWidth = 1

        const linesColor = 'rgba(255, 255, 255, 0.05)'

        const ySpacing = this.realHeight / this.height
        const xSpacing = ySpacing
        this.width = Math.ceil(this.realWidth / xSpacing)

        for (let i = 0; i < this.width / 2; i++) {
            this.ctx.beginPath()
            const x = i * xSpacing
            const y = 0
            if (xSpacing > 13) this.ctx.fillText(i, x - 3, y + 15)

            this.ctx.beginPath()
            this.ctx.strokeStyle = linesColor
            this.ctx.moveTo(x, -this.realHeight / 2)
            this.ctx.lineTo(x, this.realHeight / 2)
            this.ctx.stroke()
        }
        for (let i = 0; i < this.width / 2; i++) {
            this.ctx.beginPath()
            const x = -(i * xSpacing)
            const y = 0
            if (xSpacing > 13) this.ctx.fillText(i, x - 3, y + 15)

            this.ctx.beginPath()
            this.ctx.strokeStyle = linesColor
            this.ctx.moveTo(x, -this.realHeight / 2)
            this.ctx.lineTo(x, this.realHeight / 2)
            this.ctx.stroke()
        }

        let yNumber = this.height / 2
        for (let i = 0; i <= this.height; i++) {
            this.ctx.beginPath()
            const x = 0
            const y = i * ySpacing - this.realHeight / 2
            if (ySpacing > 13) this.ctx.fillText(yNumber, x + 5, y + 3)

            this.ctx.strokeStyle = linesColor
            this.ctx.moveTo(-this.realWidth / 2, y)
            this.ctx.lineTo(this.realWidth / 2, y)
            this.ctx.stroke()

            yNumber--
        }
    }

    drawLine(x1, y1, x2, y2) {
        if (Math.abs(y1) > this.height / 2 && Math.abs(y2) > this.height / 2)
            return
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
