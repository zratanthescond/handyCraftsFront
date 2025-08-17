export default function useRewardPoints(points)
{

    const AMOUNT_MEASURE = 10;

    const discountPerPoint = 0.3;

    const discount = discountPerPoint * points;
 
    return {

         discount
    }

}