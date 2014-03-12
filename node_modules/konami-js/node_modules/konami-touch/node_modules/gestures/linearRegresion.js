module.exports = function linearRegresion(points) {
    var sumX = 0,
        sumY = 0,
        sumXbyY = 0,
        sumXbyX = 0,
        x = 0,
        y = 0,
        numberOfPoints = points.length,
        results = [],
        m,
        b;

    if (numberOfPoints === 0) {
        return [];
    }

    for (var i = 0; i < numberOfPoints; i++) {
        x = points[i].x;
        y = points[i].y;
        sumX += x;
        sumY += y;
        sumXbyX += x*x;
        sumXbyY += x*y;
    }

    m = (numberOfPoints * sumXbyY - sumX * sumY) / (numberOfPoints * sumXbyX - sumX * sumX);
    b = (sumY / numberOfPoints) - (m * sumX) / numberOfPoints;


    for (var i = 0; i < numberOfPoints; i++) {
        results.push({
            x: points[i].x,
            y: points[i].x * m + b
        });
    }

    return results;
}