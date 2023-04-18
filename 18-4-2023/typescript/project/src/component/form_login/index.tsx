
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    FormErrorMessage
} from '@chakra-ui/react';
import { error } from 'console';

import { useForm } from 'react-hook-form';

type SigupFormInputComponent = {
    email: string,
    password: string,
}

const Form_Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<SigupFormInputComponent>();
    const onSubmit = (data: SigupFormInputComponent) => {
        console.log(data)
    }
    return (

        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>

                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    as="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors.email && false}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Email" {...register("email", { required: true })} />
                            <FormErrorMessage>Email is required</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder="Password" type="password" {...register("password", { required: true })} />
                            <FormErrorMessage>Password is required</FormErrorMessage>
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                type="submit"
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Not a member? <Link color={'blue.400'} href='/signup'>Sign up</Link> ✌️
                </Text>
            </Stack>
        </Flex>
    )
}
export default Form_Login;
