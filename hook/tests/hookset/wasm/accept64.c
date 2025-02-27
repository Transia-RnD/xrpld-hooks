/**
 * This hook just accepts any transaction coming through it
 */
#include <stdint.h>

extern int32_t _g       (uint32_t id, uint32_t maxiter);
extern int64_t accept   (uint32_t read_ptr, uint32_t read_len, int64_t error_code);

int64_t cbak(int64_t what)
{ 
    return 0;
}

int64_t hook(int64_t reserved )
{
    accept (0,0,0); 
    _g(1,1);   // every hook needs to import guard function and use it at least once
    // unreachable
    return 0;
}
